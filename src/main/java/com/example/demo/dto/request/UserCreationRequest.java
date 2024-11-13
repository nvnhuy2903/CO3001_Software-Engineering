package com.example.demo.dto.request;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public abstract class UserCreationRequest {
    private String name;
    private String fullname;
    @Size(min = 8, message = "Password must be at least 8 characters long")
    private String password;
}