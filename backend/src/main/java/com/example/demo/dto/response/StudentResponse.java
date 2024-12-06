package com.example.demo.dto.response;

import java.util.List;

import com.example.demo.models.Account;
import com.example.demo.models.PrintingLog;
import com.example.demo.models.PrintingRequest;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentResponse extends UserResponse {
    private String mssv;
    private String khoa;
    private String nganh;
    private String diachi;
    private String fullname;
    private String email;
    private Integer pages;
    private Account account;
    private List<PrintingRequest> printingRequests;
    private PrintingLog printingLog;
}
