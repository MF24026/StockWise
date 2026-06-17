package com.stockwise.stockwise.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProveedorResponseDTO {
    private Long id;
    private String nombre;
    private String telefono;
    private String email;
    private String direccion;
    private LocalDateTime createdAt;
}
