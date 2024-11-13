package com.example.demo.dto.request;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LocationRequest {
    private String campus;
    private String building;
    private String room;
}
