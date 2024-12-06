package com.example.demo.dto.response;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransactionResponse {
    private Integer id;
    private Integer amount;
    private LocalDateTime date;
    private Integer pageRemain;
    //private Integer accountId;
}
