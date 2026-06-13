package com.stockwise.stockwise.service;

import com.stockwise.stockwise.dto.ProveedorRequestDTO;
import com.stockwise.stockwise.dto.ProveedorResponseDTO;
import com.stockwise.stockwise.entity.Proveedor;
import com.stockwise.stockwise.exception.NotFoundException;
import com.stockwise.stockwise.repository.ProveedorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProveedorService {

    private final ProveedorRepository repository;

    @Transactional(readOnly = true)
    public List<ProveedorResponseDTO> getAll() {
        return repository.findAll().stream().map(this::toDTO).toList();
    }

    @Transactional(readOnly = true)
    public ProveedorResponseDTO getById(Long id) {
        return toDTO(findOrThrow(id));
    }

    @Transactional
    public ProveedorResponseDTO create(ProveedorRequestDTO dto) {
        Proveedor entity = new Proveedor();
        apply(entity, dto);
        return toDTO(repository.save(entity));
    }

    @Transactional
    public ProveedorResponseDTO update(Long id, ProveedorRequestDTO dto) {
        Proveedor entity = findOrThrow(id);
        apply(entity, dto);
        return toDTO(repository.save(entity));
    }

    @Transactional
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new NotFoundException("Proveedor no encontrado con id: " + id);
        }
        repository.deleteById(id);
    }

    private Proveedor findOrThrow(Long id) {
        return repository.findById(id)
            .orElseThrow(() -> new NotFoundException("Proveedor no encontrado con id: " + id));
    }

    private void apply(Proveedor entity, ProveedorRequestDTO dto) {
        entity.setNombre(dto.getNombre());
        entity.setTelefono(dto.getTelefono());
        entity.setEmail(dto.getEmail());
        entity.setDireccion(dto.getDireccion());
    }

    private ProveedorResponseDTO toDTO(Proveedor p) {
        return new ProveedorResponseDTO(
            p.getId(), p.getNombre(), p.getTelefono(),
            p.getEmail(), p.getDireccion(), p.getCreatedAt()
        );
    }
}
