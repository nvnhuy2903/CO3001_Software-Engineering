package com.example.demo.controller;

import org.springframework.web.bind.annotation.PostMapping;

import com.example.demo.dto.request.AccountCreateRequest;
import com.example.demo.dto.request.ApiResponse;
import com.example.demo.dto.request.ChangPassRequest;
import com.example.demo.dto.request.PrintingRequestCreation;
import com.example.demo.dto.request.StudentCreateRequest;
import com.example.demo.dto.response.StudentResponse;
import com.example.demo.models.Account;
import com.example.demo.models.PrintingRequest;
import com.example.demo.models.Student;
import com.example.demo.service.StudentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import com.example.demo.models.Printer;
import java.util.List;
import java.util.Map;

import com.example.demo.service.ExternalAPIService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/student")
public class StudentController {
    private final StudentService studentService;
    //private final AccountService accountService;
    private final ExternalAPIService externalAPIService;
    @GetMapping("/getStudent/{id}")
    public ApiResponse<StudentResponse> getStudent(@PathVariable Integer id){
        return ApiResponse.<StudentResponse>builder().
                            result(studentService.getStudentById(id)).
                            build();
    }
    // @PostMapping("/createPrintingRequest")
    // public ApiResponse<PrintingRequest> createPrintingRequest(@Valid @RequestBody PrintingRequest request){
    //     return ApiResponse.<PrintingRequest>builder().
    //                         result(studentService.createPrintingRequest(request)).
    //                         build();
    // }
    // @PostMapping("/create")
    // public ApiResponse<StudentResponse> createStudent(@Valid @RequestBody StudentCreateRequest request){
    //     return ApiResponse.<StudentResponse>builder().
    //                         result(studentService.createStudent(request)).
    //                         build();
    // }
    @PostMapping("/checkLogin")
    public ApiResponse<Boolean> checkLogin(@RequestParam String username, @RequestParam String password){
        return ApiResponse.<Boolean>builder().
                            result(externalAPIService.checkLogin(username, password)).
                            build();
    }

    @PostMapping("/get")
    public ApiResponse<Map<String,Object>> get(@RequestParam String username, @RequestParam String password){
        return ApiResponse.<Map<String,Object>>builder().
                            result(externalAPIService.checkLogin2(username, password)).
                            build();
    }

    @PostMapping("/changePassword")
    public ApiResponse<StudentResponse> changePassword(@Valid @RequestBody ChangPassRequest request){
        return ApiResponse.<StudentResponse>builder().
                            result(studentService.changePassword(request)).
                            build();
    }


    @GetMapping("/getpagebuy/{id}")
    public ApiResponse<Integer> getbuy(@PathVariable Integer id){
        return ApiResponse.<Integer>builder().
                            result(studentService.totalPageBuy(id)).
                            build();
    }


    @GetMapping("/getpageprinted/{id}")
    public ApiResponse<Integer> getprinted(@PathVariable Integer id){
        return ApiResponse.<Integer>builder().
                            result(studentService.totalPagePrinted(id)).
                            build();
    }


    @GetMapping("/getallrequest/{id}")
    public ApiResponse<List<PrintingRequest>> getrequests(@PathVariable Integer id){
        return ApiResponse.<List<PrintingRequest>>builder().
                            result(studentService.getAllPrinting(id)).
                            build();
    }
}

