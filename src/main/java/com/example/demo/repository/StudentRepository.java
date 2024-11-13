package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.models.Student;

public interface StudentRepository extends JpaRepository<Student, Integer> {
    boolean existsByName(String name);
    Student findByName(String name);
}
