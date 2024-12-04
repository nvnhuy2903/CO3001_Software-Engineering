package com.example.demo.mapper;

import org.mapstruct.Mapper;

import com.example.demo.dto.request.SPSOCreateRequest;
import com.example.demo.dto.response.SPSOResponse;
import com.example.demo.models.SPSO;

@Mapper(componentModel = "spring")
public interface SPSOMapper {
    SPSOResponse toResponse(SPSO spso);
    SPSO toSPSO(SPSOCreateRequest request);
}
