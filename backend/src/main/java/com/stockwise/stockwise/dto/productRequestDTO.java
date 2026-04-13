package com.stockwise.stockwise.dto;

import lombok.Data;

@Data
public class productRequestDTO {
private String nombre;
private String descripcion;
private Double precio;
private Integer stock;
private Integer stockMinimo;
}

