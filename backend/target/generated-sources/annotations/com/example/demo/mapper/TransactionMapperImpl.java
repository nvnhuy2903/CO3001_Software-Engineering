package com.example.demo.mapper;

import com.example.demo.dto.request.TransactionCreateRequest;
import com.example.demo.dto.response.TransactionResponse;
import com.example.demo.models.Transaction;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-12-10T07:18:24+0700",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.40.0.z20241112-1021, environment: Java 17.0.13 (Eclipse Adoptium)"
)
@Component
public class TransactionMapperImpl implements TransactionMapper {

    @Override
    public TransactionResponse toResponse(Transaction transaction) {
        if ( transaction == null ) {
            return null;
        }

        TransactionResponse transactionResponse = new TransactionResponse();

        transactionResponse.setAmount( transaction.getAmount() );
        transactionResponse.setDate( transaction.getDate() );
        transactionResponse.setId( transaction.getId() );

        return transactionResponse;
    }

    @Override
    public Transaction toTransaction(TransactionCreateRequest request) {
        if ( request == null ) {
            return null;
        }

        Transaction.TransactionBuilder transaction = Transaction.builder();

        transaction.amount( request.getAmount() );

        return transaction.build();
    }
}
