package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.models.Printer;

public interface PrinterRepository extends JpaRepository<Printer, Integer> {

}
