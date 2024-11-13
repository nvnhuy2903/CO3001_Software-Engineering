package com.example.demo.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
//@Builder
//@NoArgsConstructor
@AllArgsConstructor
public class SPSO extends User {
    // @Id
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    // private Integer id;
    // private String name;
    // private String fullname;
    // private String password;
}
