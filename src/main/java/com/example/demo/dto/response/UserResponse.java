package com.example.demo.dto.response;

import java.util.List;

import com.example.demo.models.Account;
import com.example.demo.models.PrintingRequest;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public abstract class UserResponse {
    private Integer id;
    private String fullname;
    
}