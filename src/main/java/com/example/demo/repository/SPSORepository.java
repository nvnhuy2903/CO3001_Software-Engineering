package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.models.SPSO;

public interface SPSORepository extends JpaRepository<SPSO, Integer> {
    boolean existsByName(String name);
    SPSO findByName(String name);
}
