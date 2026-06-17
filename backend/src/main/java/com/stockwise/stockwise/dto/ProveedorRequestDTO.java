package com.stockwise.stockwise.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ProveedorRequestDTO {

    @NotBlank
    @Size(max = 120)
    private String nombre;

    @Size(max = 30)
    private String telefono;

    @Email
    @Size(max = 120)
    private String email;

    @Size(max = 200)
    private String direccion;
}
