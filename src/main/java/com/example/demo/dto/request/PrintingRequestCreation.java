package com.example.demo.dto.request;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PrintingRequestCreation {
    private MultipartFile file;
    private String typePaper;
    private Integer copies;
}
