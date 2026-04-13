package com.stockwise.stockwise.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.List;

import com.stockwise.stockwise.service.productService;
import com.stockwise.stockwise.dto.productRequestDTO;
import com.stockwise.stockwise.dto.productResponseDTO;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final productService service;

    public ProductController(productService service) {
        this.service = service;
    }

    // GET ALL
    @GetMapping
    public ResponseEntity<List<productResponseDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    // GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<productResponseDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    // POST
    @PostMapping
    public ResponseEntity<productResponseDTO> create(@RequestBody productRequestDTO product) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.create(product));
    }

    // PUT
    @PutMapping("/{id}")
    public ResponseEntity<productResponseDTO> update(@PathVariable Long id,
                                                     @RequestBody productRequestDTO product) {
        return ResponseEntity.ok(service.update(id, product));
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}