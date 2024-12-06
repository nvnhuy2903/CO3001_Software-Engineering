package com.example.demo.models;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PrintingRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String fileName;
    private String fileType;
    private Integer fileSize;
    private Integer copies;
    private Integer pages;
    private String typePaper;
    private Integer somat;
    private LocalDateTime createdAt;
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "student_id")
    private Student student;

    
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "printer_id")
    private Printer printer;


    @ManyToOne
    @JoinColumn(name = "printing_log_id")
    @JsonIgnore
    private PrintingLog printingLog;
    
}
