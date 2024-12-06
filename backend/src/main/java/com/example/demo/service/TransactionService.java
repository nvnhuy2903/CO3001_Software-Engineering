package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import com.example.demo.dto.request.TransactionCreateRequest;
import com.example.demo.dto.response.TransactionResponse;
import com.example.demo.exception.AppException;
import com.example.demo.exception.ErrorCode;
import com.example.demo.mapper.TransactionMapper;
import com.example.demo.models.Account;
import com.example.demo.models.Student;
import com.example.demo.models.Transaction;
import com.example.demo.repository.AccountRepository;
import com.example.demo.repository.StudentRepository;
import com.example.demo.repository.TransactionRepository;
@Service
@RequiredArgsConstructor
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final AccountRepository accountRepository;
    private final StudentRepository studentRepository;
    private final TransactionMapper transactionMapper;
    
    public Transaction createPaymentTransaction(TransactionCreateRequest request, Integer studentID){
        Transaction transaction = transactionMapper.toTransaction(request);
        transaction.setType("payment");
        transaction.setDate(LocalDateTime.now());
        Student student =studentRepository.findById(studentID).orElse(null);
        Account account = student.getAccount();
        student.setPages(student.getPages() + transaction.getAmount()*5/1000);
        account.setBalance(account.getBalance() - transaction.getAmount());
        transaction.setBalanceAfter(account.getBalance());
        transaction.setAccount(account);
        List<Transaction> transactions = account.getTransactions();
        transactions.add(transaction);
        account.setTransactions(transactions);
        return transactionRepository.save(transaction);
    }
    public Transaction CreateRechargeTransaction(TransactionCreateRequest request, Integer studentID){
        Transaction transaction = transactionMapper.toTransaction(request);
        transaction.setType("recharge");
        transaction.setDate(LocalDateTime.now());
        Student student =studentRepository.findById(studentID).orElse(null);
        Account account = student.getAccount();
        //student.setPages(100);
        account.setBalance(account.getBalance() + transaction.getAmount());
        transaction.setBalanceAfter(account.getBalance());
        transaction.setAccount(account);
        List<Transaction> transactions = account.getTransactions();
        transactions.add(transaction);
        account.setTransactions(transactions);
        return transactionRepository.save(transaction);
    }

    public Boolean buyPage(TransactionCreateRequest request, Integer studentID){
        Transaction transaction = transactionMapper.toTransaction(request);
        transaction.setType("buyPage");
        transaction.setDate(LocalDateTime.now());
        Student student =studentRepository.findById(studentID).orElse(null);
        Account account = student.getAccount();
        student.setPages(student.getPages()+request.getAmount());
        transaction.setBalanceAfter(student.getPages());
        transaction.setAccount(account);
        List<Transaction> transactions = account.getTransactions();
        transactions.add(transaction);
        account.setTransactions(transactions);
        transactionRepository.save(transaction);
        return true;
    }

    public void minusPage(Integer request, Integer studentID){
        Transaction transaction = new Transaction();
        transaction.setType("minusPage");
        transaction.setAmount(request);
        transaction.setDate(LocalDateTime.now());
        Student student =studentRepository.findById(studentID).orElse(null);
        Account account = student.getAccount();
        student.setPages(student.getPages()-request);
        transaction.setBalanceAfter(student.getPages());
        transaction.setAccount(account);
        List<Transaction> transactions = account.getTransactions();
        transactions.add(transaction);
        account.setTransactions(transactions);
        transactionRepository.save(transaction);
        return;
    }


    public List<Transaction> getALlTransactions(Integer studentID){
        Student student=studentRepository.findById(studentID).orElse(null);
        return student.getAccount().getTransactions();
    }
}
