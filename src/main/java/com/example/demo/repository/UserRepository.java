package com.example.demo.repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.models.User;
public interface UserRepository extends JpaRepository<User, Integer> {
    boolean existsByName(String name);
    Optional<User> findByName(String username);
}
