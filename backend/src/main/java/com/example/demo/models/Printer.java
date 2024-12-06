package com.example.demo.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Builder.Default;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder    
@Entity
public class Printer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String brand;
    private String model;
    private String description;
    private Integer pagesA4;
    private Integer pagesA3;    
    private Integer pagesA2;
    @ManyToOne
    @JoinColumn(name = "location_id")
    private Location location;
    @Default
    private Boolean isAvailable = true;
    @OneToMany(mappedBy = "printer")
    private List<PrintingRequest> printingRequests;

    
}
