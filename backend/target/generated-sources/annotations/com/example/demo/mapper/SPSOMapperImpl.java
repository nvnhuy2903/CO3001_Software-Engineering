package com.example.demo.mapper;

import com.example.demo.dto.request.SPSOCreateRequest;
import com.example.demo.dto.response.SPSOResponse;
import com.example.demo.models.SPSO;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-12-06T07:19:41+0700",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.40.0.z20241112-1021, environment: Java 17.0.13 (Eclipse Adoptium)"
)
@Component
public class SPSOMapperImpl implements SPSOMapper {

    @Override
    public SPSOResponse toResponse(SPSO spso) {
        if ( spso == null ) {
            return null;
        }

        SPSOResponse sPSOResponse = new SPSOResponse();

        sPSOResponse.setId( spso.getId() );

        return sPSOResponse;
    }

    @Override
    public SPSO toSPSO(SPSOCreateRequest request) {
        if ( request == null ) {
            return null;
        }

        SPSO sPSO = new SPSO();

        sPSO.setName( request.getName() );
        sPSO.setPassword( request.getPassword() );

        return sPSO;
    }
}
