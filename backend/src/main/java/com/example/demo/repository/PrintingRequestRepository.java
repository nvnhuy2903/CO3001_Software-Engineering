package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.models.PrintingRequest;

public interface PrintingRequestRepository extends JpaRepository<PrintingRequest, Integer> {

}
