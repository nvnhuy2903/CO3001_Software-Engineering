package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import com.example.demo.dto.request.TransactionCreateRequest;
import com.example.demo.exception.AppException;
import com.example.demo.exception.ErrorCode;
import com.example.demo.mapper.TransactionMapper;
import com.example.demo.models.Account;
import com.example.demo.models.Student;
import com.example.demo.models.Transaction;
import com.example.demo.repository.AccountRepository;
import com.example.demo.repository.TransactionRepository;
@Service
@RequiredArgsConstructor
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final AccountRepository accountRepository;
    private final TransactionMapper transactionMapper;
    public Transaction createPaymentTransaction(TransactionCreateRequest request, Integer accountId){
        Transaction transaction = transactionMapper.toTransaction(request);
        transaction.setType("payment");
        transaction.setDate(LocalDateTime.now());
        Account account = accountRepository.findById(accountId).orElse(null);
        if(account == null){
            throw new AppException(ErrorCode.ACCOUNT_NOT_FOUND);
        }
        Student student=account.getStudent();
        student.setPages(student.getPages() + transaction.getAmount()*5/1000);
        account.setBalance(account.getBalance() - transaction.getAmount());
        transaction.setBalanceAfter(account.getBalance());
        transaction.setAccount(account);
        List<Transaction> transactions = account.getTransactions();
        transactions.add(transaction);
        account.setTransactions(transactions);
        return transactionRepository.save(transaction);
    }
    public Transaction CreateRechargeTransaction(TransactionCreateRequest request, Integer accountId){
        Transaction transaction = transactionMapper.toTransaction(request);
        transaction.setType("recharge");
        transaction.setDate(LocalDateTime.now());
        Account account = accountRepository.findById(accountId).orElseThrow(()->new AppException(ErrorCode.ACCOUNT_NOT_FOUND));
        Student student = account.getStudent();
        //student.setPages(100);
        account.setBalance(account.getBalance() + transaction.getAmount());
        transaction.setBalanceAfter(account.getBalance());
        transaction.setAccount(account);
        List<Transaction> transactions = account.getTransactions();
        transactions.add(transaction);
        account.setTransactions(transactions);
        return transactionRepository.save(transaction);
    }
}
