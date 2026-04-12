package com.stockwise.stockwise.dto;

import lombok.Data;

@Data
public class productResponseDTO {
    private Long id;
    private String nombre;
    private String descripcion;
    private Double precio;
    private Integer stock;
    private Integer stockMinimo;
}
