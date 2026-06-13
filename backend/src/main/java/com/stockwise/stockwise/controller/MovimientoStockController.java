package com.stockwise.stockwise.controller;

import com.stockwise.stockwise.dto.MovimientoStockRequestDTO;
import com.stockwise.stockwise.dto.MovimientoStockResponseDTO;
import com.stockwise.stockwise.service.MovimientoStockService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movimientos")
@RequiredArgsConstructor
@Tag(name = "Movimientos de stock", description = "Entradas y salidas que ajustan el stock de cada producto")
public class MovimientoStockController {

    private final MovimientoStockService service;

    @GetMapping
    public ResponseEntity<List<MovimientoStockResponseDTO>> getAll(@RequestParam(required = false) Long productoId) {
        if (productoId != null) {
            return ResponseEntity.ok(service.getByProducto(productoId));
        }
        return ResponseEntity.ok(service.getAll());
    }

    @PostMapping
    public ResponseEntity<MovimientoStockResponseDTO> create(@Valid @RequestBody MovimientoStockRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(dto));
    }
}
