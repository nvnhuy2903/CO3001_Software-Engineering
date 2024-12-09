package com.example.demo.mapper;

import com.example.demo.dto.request.AccountCreateRequest;
import com.example.demo.dto.response.AccountResponse;
import com.example.demo.models.Account;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-12-09T14:28:19+0700",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.40.0.z20241112-1021, environment: Java 17.0.13 (Eclipse Adoptium)"
)
@Component
public class AccountMapperImpl implements AccountMapper {

    @Override
    public AccountResponse toResponse(Account account) {
        if ( account == null ) {
            return null;
        }

        AccountResponse accountResponse = new AccountResponse();

        accountResponse.setBalance( account.getBalance() );
        accountResponse.setId( account.getId() );

        return accountResponse;
    }

    @Override
    public Account toAccount(AccountCreateRequest request) {
        if ( request == null ) {
            return null;
        }

        Account.AccountBuilder account = Account.builder();

        account.balance( request.getBalance() );

        return account.build();
    }
}
