package com.stockwise.stockwise.dto;

import com.stockwise.stockwise.entity.MovimientoStock;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovimientoStockResponseDTO {
    private Long id;
    private Long productoId;
    private String productoNombre;
    private MovimientoStock.Tipo tipo;
    private Integer cantidad;
    private String motivo;
    private LocalDateTime fecha;
}
