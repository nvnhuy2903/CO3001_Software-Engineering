package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.models.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {

}
