package com.example.demo.models;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
@Entity
@Data
//@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Student extends User {
    // @Id
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    // private Integer Id;
    // private String name;
    // private String fullname;
    // private String password;
    private Integer pages;
    @OneToOne(mappedBy = "student", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Account account;
    @OneToMany(mappedBy = "student")
    private List<PrintingRequest> printingRequests;
    @OneToOne(mappedBy="student")
    private PrintingLog printingLog;

}