package com.example.demo.service;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Service;
@Service    
public class ExternalAPIService {
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
            System.out.println(doc.html());
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
                
                System.out.println("Logged in " + user + " successfully");
                return true;
            } else {
                System.out.println("Login failed");
                return false;
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return false;
    }
}