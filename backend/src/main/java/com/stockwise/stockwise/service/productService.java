package com.stockwise.stockwise.service;

import com.stockwise.stockwise.dto.productRequestDTO;
import com.stockwise.stockwise.dto.productResponseDTO;
import com.stockwise.stockwise.entity.Product;
import com.stockwise.stockwise.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class productService {

    private final ProductRepository productRepository;
    //mapeo
// De entidad a DTO(para enviar datos al cliente)

private productResponseDTO toDTO(Product product) {
    productResponseDTO dto = new productResponseDTO();
    dto.setId(product.getId());
    dto.setNombre(product.getNombre());
    dto.setDescripcion(product.getDescripcion());
    dto.setPrecio(product.getPrecio());
    dto.setStock(product.getStock());
    dto.setStockMinimo(product.getStockMinimo());
    return dto;
}
// de DTO a entidad(para recibir y guardar datos)
    private Product toEntity(productRequestDTO dto) {
    Product product = new Product();
    product.setNombre(dto.getNombre());
    product.setDescripcion(dto.getDescripcion());
    product.setPrecio(dto.getPrecio());
    product.setStock(dto.getStock());
    product.setStockMinimo(dto.getStockMinimo());
    return product;
    }
    //CRUD
    //Get
    public List<productResponseDTO> getAll() {
    return productRepository.findAll()
            .stream()
            .map(this::toDTO)
            .collect(Collectors.toList());
    }
    public productResponseDTO getById(Long id) {
     Product product = productRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("producto no encontrado con id: " + id));
       return toDTO(product);
    }
//Post
    public productResponseDTO create(productRequestDTO dto) {
    Product product = toEntity(dto);
    Product saved = productRepository.save(product);
    return toDTO(saved);
    }
    //Put
    public productResponseDTO update(Long id, productRequestDTO dto) {
    Product product = productRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("producto no encontrado con id: " + id));

    product.setNombre(dto.getNombre());
    product.setDescripcion(dto.getDescripcion());
    product.setPrecio(dto.getPrecio());
    product.setStock(dto.getStock());
    product.setStockMinimo(dto.getStockMinimo());

    return toDTO(productRepository.save(product));
    }
    //Delete
    public void delete(Long id) {
    if(!productRepository.existsById(id)) {
        throw new RuntimeException("producto no encontrado con id: " + id);
    }
    productRepository.deleteById(id);

    }
}


