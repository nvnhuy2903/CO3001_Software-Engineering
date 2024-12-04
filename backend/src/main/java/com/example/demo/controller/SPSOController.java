package com.example.demo.controller;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.request.ApiResponse;
import com.example.demo.dto.request.ChangPassRequest;
import com.example.demo.dto.request.SPSOCreateRequest;
import com.example.demo.dto.request.StudentCreateRequest;
import com.example.demo.dto.response.SPSOResponse;
import com.example.demo.dto.response.StudentResponse;
import com.example.demo.models.Location;
import com.example.demo.models.Printer;
import com.example.demo.service.SPSOService;
import com.example.demo.service.StudentService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping("/spso")
public class SPSOController {
    private final SPSOService spsoService;
    private final StudentService studentService;
    @PostMapping("/create")
    public ApiResponse<SPSOResponse> createSPSO(@Valid @RequestBody SPSOCreateRequest request){
        return ApiResponse.<SPSOResponse>builder().
                            result(spsoService.createSPSO(request)).
                            build();
    }
    @PostMapping("/changePassword")
    public ApiResponse<SPSOResponse> changePassword(@Valid @RequestBody ChangPassRequest request){
        return ApiResponse.<SPSOResponse>builder().
                            result(spsoService.changePassword(request)).
                            build();
    }
    
}
