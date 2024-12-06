package com.example.demo.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.demo.dto.request.TransactionCreateRequest;
import com.example.demo.dto.response.TransactionResponse;
import com.example.demo.models.Transaction;

@Mapper(componentModel = "spring")
public interface TransactionMapper {
    //@Mapping(target = "accountId", ignore = true)
    TransactionResponse toResponse(Transaction transaction);
    Transaction toTransaction(TransactionCreateRequest request);
}
