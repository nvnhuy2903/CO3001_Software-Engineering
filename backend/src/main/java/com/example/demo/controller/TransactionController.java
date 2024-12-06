package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
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

    @PostMapping("/pluspage/{studentID}")
    public ApiResponse<Boolean> createPaymentTransaction(@RequestBody  TransactionCreateRequest request, @PathVariable Integer studentID){
        return ApiResponse.<Boolean>builder().
                            result(transactionService.buyPage(request, studentID)).
                            build();
    }
    // @PostMapping("/minuspage/{studentID}")
    // public ApiResponse<Boolean> createRechargeTransaction(@RequestBody  TransactionCreateRequest request, @PathVariable Integer studentID){
    //     return ApiResponse.<Boolean>builder().
    //                         result(transactionService.minusPage(request, studentID)).
    //                         build();
    // }


    @GetMapping("/getalltransactions/{studentID}")
    public ApiResponse<List<Transaction>> getAll(@PathVariable Integer studentID){
        return ApiResponse.<List<Transaction>>builder().
                            result(transactionService.getALlTransactions(studentID)).
                            build();
    }
}
