package com.stockwise.stockwise.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CategoriaRequestDTO {

    @NotBlank
    @Size(max = 80)
    private String nombre;

    @Size(max = 200)
    private String descripcion;
}
