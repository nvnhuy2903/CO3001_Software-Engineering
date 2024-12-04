package com.example.demo.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.request.ApiResponse;
import com.example.demo.dto.request.TransactionCreateRequest;
import com.example.demo.models.Transaction;
import com.example.demo.service.TransactionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/transactions")
@RequiredArgsConstructor
public class TransactionController {
    private final TransactionService transactionService;

    @PostMapping("/payment/{accountId}")
    public ApiResponse<Transaction> createPaymentTransaction(@RequestBody  TransactionCreateRequest request, @PathVariable Integer accountId){
        return ApiResponse.<Transaction>builder().
                            result(transactionService.createPaymentTransaction(request, accountId)).
                            build();
    }
    @PostMapping("/recharge/{accountId}")
    public ApiResponse<Transaction> createRechargeTransaction(@RequestBody  TransactionCreateRequest request, @PathVariable Integer accountId){
        return ApiResponse.<Transaction>builder().
                            result(transactionService.CreateRechargeTransaction(request, accountId)).
                            build();
    }
}
