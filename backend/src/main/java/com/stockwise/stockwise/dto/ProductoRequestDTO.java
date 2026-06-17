package com.stockwise.stockwise.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@Data
public class ProductoRequestDTO {

    @NotBlank
    @Size(max = 120)
    private String nombre;

    private String descripcion;

    @NotNull
    @DecimalMin(value = "0.00", inclusive = true)
    @Digits(integer = 8, fraction = 2)
    private BigDecimal precio;

    @NotNull
    @PositiveOrZero
    private Integer stock;

    @NotNull
    @PositiveOrZero
    private Integer stockMinimo;

    @NotNull
    private Long proveedorId;

    private Set<Long> categoriaIds = new HashSet<>();
}
