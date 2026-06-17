package com.stockwise.stockwise.service;

import com.stockwise.stockwise.dto.MovimientoStockRequestDTO;
import com.stockwise.stockwise.dto.MovimientoStockResponseDTO;
import com.stockwise.stockwise.entity.MovimientoStock;
import com.stockwise.stockwise.entity.Producto;
import com.stockwise.stockwise.exception.BusinessException;
import com.stockwise.stockwise.exception.NotFoundException;
import com.stockwise.stockwise.repository.MovimientoStockRepository;
import com.stockwise.stockwise.repository.ProductoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MovimientoStockService {

    private final MovimientoStockRepository movimientoRepository;
    private final ProductoRepository productoRepository;

    @Transactional(readOnly = true)
    public List<MovimientoStockResponseDTO> getAll() {
        return movimientoRepository.findAll().stream().map(this::toDTO).toList();
    }

    @Transactional(readOnly = true)
    public List<MovimientoStockResponseDTO> getByProducto(Long productoId) {
        return movimientoRepository.findByProductoIdOrderByFechaDesc(productoId)
            .stream().map(this::toDTO).toList();
    }

    @Transactional
    public MovimientoStockResponseDTO create(MovimientoStockRequestDTO dto) {
        Producto producto = productoRepository.findById(dto.getProductoId())
            .orElseThrow(() -> new NotFoundException("Producto no encontrado con id: " + dto.getProductoId()));

        int delta = dto.getTipo() == MovimientoStock.Tipo.ENTRADA ? dto.getCantidad() : -dto.getCantidad();
        int nuevoStock = producto.getStock() + delta;
        if (nuevoStock < 0) {
            throw new BusinessException("Stock insuficiente: actual " + producto.getStock() + ", se intenta sacar " + dto.getCantidad());
        }
        producto.setStock(nuevoStock);

        MovimientoStock movimiento = new MovimientoStock();
        movimiento.setProducto(producto);
        movimiento.setTipo(dto.getTipo());
        movimiento.setCantidad(dto.getCantidad());
        movimiento.setMotivo(dto.getMotivo());

        return toDTO(movimientoRepository.save(movimiento));
    }

    private MovimientoStockResponseDTO toDTO(MovimientoStock m) {
        return new MovimientoStockResponseDTO(
            m.getId(),
            m.getProducto().getId(),
            m.getProducto().getNombre(),
            m.getTipo(),
            m.getCantidad(),
            m.getMotivo(),
            m.getFecha()
        );
    }
}
