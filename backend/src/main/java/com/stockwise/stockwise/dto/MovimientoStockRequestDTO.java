package com.stockwise.stockwise.dto;

import com.stockwise.stockwise.entity.MovimientoStock;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class MovimientoStockRequestDTO {

    @NotNull
    private Long productoId;

    @NotNull
    private MovimientoStock.Tipo tipo;

    @NotNull
    @Positive
    private Integer cantidad;

    @Size(max = 200)
    private String motivo;
}
