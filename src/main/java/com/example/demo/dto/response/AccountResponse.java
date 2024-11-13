package com.example.demo.dto.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccountResponse {
    private Integer id;
    private Integer balance;
    private StudentResponse student;
    private List<TransactionResponse> transactions;
}
