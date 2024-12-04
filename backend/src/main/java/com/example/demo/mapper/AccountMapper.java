    package com.example.demo.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.demo.dto.request.AccountCreateRequest;
import com.example.demo.dto.response.AccountResponse;
import com.example.demo.models.Account;

@Mapper(componentModel = "spring")
public interface AccountMapper {
    @Mapping(target = "student", ignore = true)
    @Mapping(target = "transactions", ignore = true)
    AccountResponse toResponse(Account account);
    Account toAccount(AccountCreateRequest request);

}
