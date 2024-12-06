package com.example.demo.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Scanner;
import java.util.stream.Collectors;

import org.apache.hc.client5.http.classic.methods.HttpGet;
import org.apache.hc.client5.http.classic.methods.HttpPost;
import org.apache.hc.client5.http.entity.UrlEncodedFormEntity;
import org.apache.hc.client5.http.impl.classic.CloseableHttpClient;
import org.apache.hc.client5.http.impl.classic.CloseableHttpResponse;
import org.apache.hc.client5.http.impl.classic.HttpClients;
import org.apache.hc.core5.http.ParseException;
import org.apache.hc.core5.http.io.entity.EntityUtils;
import org.apache.hc.core5.http.message.BasicNameValuePair;
import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import com.google.gson.JsonParser;
import com.google.gson.JsonSyntaxException;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonObject;
@Service    
public class ExternalAPIService {
    private Map<String,Object> mp;
    public boolean checkLogin(String user, String pass) {



        Map<String, String> loginData = new HashMap<>();
        loginData.put("username", user);
        loginData.put("password", pass);
        loginData.put("_eventId", "submit");
        loginData.put("submit", "Login");

        try {
            Connection.Response loginPageResponse = Jsoup.connect("https://sso.hcmut.edu.vn/cas/login?service=https%3A%2F%2Fmybk.hcmut.edu.vn%2Fapp%2Flogin%2Fcas")
                    .userAgent("Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36 Edg/126.0.0.0")
                    .method(Connection.Method.GET)
                    .execute();

            Document doc = loginPageResponse.parse();
            //System.out.println(doc.html());
            Element ltInput = doc.selectFirst("input[name=lt]");
            Element executionInput = doc.selectFirst("input[name=execution]");
            loginData.put("lt", ltInput.val());
            loginData.put("execution", executionInput.val());

            Connection.Response response = Jsoup.connect("https://sso.hcmut.edu.vn/cas/login?service=https%3A%2F%2Fmybk.hcmut.edu.vn%2Fapp%2Flogin%2Fcas")
                    .cookies(loginPageResponse.cookies()) 
                    
                    .data(loginData)
                    .method(Connection.Method.POST)
                    .execute();

            if (response.url().toString().equals("https://mybk.hcmut.edu.vn/app/")) {
                
            //     System.out.println("Logged in " + user + " successfully");
            //     //return fetchStudentInfo(response.cookies());
            //     System.out.println(response.body());
                    Document doc1 = response.parse();

            // // Lấy tên sinh viên
            //     Element fullNameElement = doc1.selectFirst("p.fullName");
            //     String fullName = (fullNameElement != null) ? fullNameElement.text() : "Không tìm thấy tên";

            // // Lấy thông tin khoa
            //     Element facultyElement = doc1.selectFirst("div.pull-left.info a");
            //     String facultyInfo = (facultyElement != null) ? facultyElement.text() : "Không tìm thấy khoa";

            // // In thông tin ra console
            //     System.out.println("Tên sinh viên: " + fullName);
            //     System.out.println("Khoa: " + facultyInfo);


            //System.out.println(token1);
            return fetchStudentInfo(response.cookies());
                //return true;
            } else {
                System.out.println("Login failed");
                return false;
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return false;
    }
    private boolean fetchStudentInfo(Map<String, String> cookies) {
        try {
            Document studentInfoPage = Jsoup.connect("https://mybk.hcmut.edu.vn/app/he-thong-quan-ly/sinh-vien/thong-tin")
                    .cookies(cookies) 
                    //.header("Authorization", "Bearer " + token) // Thêm token vào header
                    .userAgent("Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36 Edg/126.0.0.0")
                    .get();


            Element token = studentInfoPage.selectFirst("input[id=hid_Token]");
            String token1 = (token != null) ? token.attr("value") : "Không tìm thấy token";
            System.out.println(token1);

            return fetchInfo(cookies, token1);
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }
    private boolean fetchInfo(Map<String, String> cookies, String token) {
        try {

            RestTemplate restTemplate = new RestTemplate();


            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + token);
            headers.set("Content-Type", "application/json");

            for (Map.Entry<String, String> cookie : cookies.entrySet()) {
                headers.add("Cookie", cookie.getKey() + "=" + cookie.getValue());
            }


            HttpEntity<String> entity = new HttpEntity<>(headers);

            String url = "https://mybk.hcmut.edu.vn/api/v1/student/get-student-info?null";
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

            ObjectMapper objectMapper = new ObjectMapper();
            mp=objectMapper.readValue(response.getBody(), new TypeReference<Map<String, Object>>() {});


            return true;

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    public Map<String,Object> checkLogin2(String user, String pass) {
        checkLogin(user, pass);
        Map<String,Object> mp2=(Map<String,Object>)mp.get("data");
        System.out.println(mp2.get("code"));
        return mp2;
    }
    
    
}

