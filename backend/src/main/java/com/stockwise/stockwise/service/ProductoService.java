package com.stockwise.stockwise.service;

import com.stockwise.stockwise.dto.CategoriaResponseDTO;
import com.stockwise.stockwise.dto.ProductoRequestDTO;
import com.stockwise.stockwise.dto.ProductoResponseDTO;
import com.stockwise.stockwise.entity.Categoria;
import com.stockwise.stockwise.entity.Producto;
import com.stockwise.stockwise.entity.Proveedor;
import com.stockwise.stockwise.exception.NotFoundException;
import com.stockwise.stockwise.repository.CategoriaRepository;
import com.stockwise.stockwise.repository.ProductoRepository;
import com.stockwise.stockwise.repository.ProveedorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ProductoService {

    private final ProductoRepository productoRepository;
    private final ProveedorRepository proveedorRepository;
    private final CategoriaRepository categoriaRepository;

    @Transactional(readOnly = true)
    public List<ProductoResponseDTO> getAll() {
        return productoRepository.findAll().stream().map(this::toDTO).toList();
    }

    @Transactional(readOnly = true)
    public ProductoResponseDTO getById(Long id) {
        return toDTO(findOrThrow(id));
    }

    @Transactional
    public ProductoResponseDTO create(ProductoRequestDTO dto) {
        Producto entity = new Producto();
        apply(entity, dto);
        return toDTO(productoRepository.save(entity));
    }

    @Transactional
    public ProductoResponseDTO update(Long id, ProductoRequestDTO dto) {
        Producto entity = findOrThrow(id);
        apply(entity, dto);
        return toDTO(productoRepository.save(entity));
    }

    @Transactional
    public void delete(Long id) {
        if (!productoRepository.existsById(id)) {
            throw new NotFoundException("Producto no encontrado con id: " + id);
        }
        productoRepository.deleteById(id);
    }

    private Producto findOrThrow(Long id) {
        return productoRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Producto no encontrado con id: " + id));
    }

    private void apply(Producto entity, ProductoRequestDTO dto) {
        Proveedor proveedor = proveedorRepository.findById(dto.getProveedorId())
            .orElseThrow(() -> new NotFoundException("Proveedor no encontrado con id: " + dto.getProveedorId()));

        Set<Categoria> categorias = new HashSet<>();
        if (dto.getCategoriaIds() != null && !dto.getCategoriaIds().isEmpty()) {
            categorias.addAll(categoriaRepository.findAllById(dto.getCategoriaIds()));
            if (categorias.size() != dto.getCategoriaIds().size()) {
                throw new NotFoundException("Una o mas categorias no existen");
            }
        }

        entity.setNombre(dto.getNombre());
        entity.setDescripcion(dto.getDescripcion());
        entity.setPrecio(dto.getPrecio());
        entity.setStock(dto.getStock());
        entity.setStockMinimo(dto.getStockMinimo());
        entity.setProveedor(proveedor);
        entity.setCategorias(categorias);
    }

    private ProductoResponseDTO toDTO(Producto p) {
        List<CategoriaResponseDTO> categorias = p.getCategorias().stream()
            .map(c -> new CategoriaResponseDTO(c.getId(), c.getNombre(), c.getDescripcion()))
            .toList();
        return new ProductoResponseDTO(
            p.getId(), p.getNombre(), p.getDescripcion(),
            p.getPrecio(), p.getStock(), p.getStockMinimo(),
            p.getProveedor().getId(), p.getProveedor().getNombre(),
            categorias, p.getCreatedAt()
        );
    }
}
