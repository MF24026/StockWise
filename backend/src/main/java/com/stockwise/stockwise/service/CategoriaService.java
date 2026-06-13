package com.stockwise.stockwise.service;

import com.stockwise.stockwise.dto.CategoriaRequestDTO;
import com.stockwise.stockwise.dto.CategoriaResponseDTO;
import com.stockwise.stockwise.entity.Categoria;
import com.stockwise.stockwise.exception.NotFoundException;
import com.stockwise.stockwise.repository.CategoriaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoriaService {

    private final CategoriaRepository repository;

    @Transactional(readOnly = true)
    public List<CategoriaResponseDTO> getAll() {
        return repository.findAll().stream().map(this::toDTO).toList();
    }

    @Transactional(readOnly = true)
    public CategoriaResponseDTO getById(Long id) {
        return toDTO(findOrThrow(id));
    }

    @Transactional
    public CategoriaResponseDTO create(CategoriaRequestDTO dto) {
        Categoria entity = new Categoria();
        apply(entity, dto);
        return toDTO(repository.save(entity));
    }

    @Transactional
    public CategoriaResponseDTO update(Long id, CategoriaRequestDTO dto) {
        Categoria entity = findOrThrow(id);
        apply(entity, dto);
        return toDTO(repository.save(entity));
    }

    @Transactional
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new NotFoundException("Categoria no encontrada con id: " + id);
        }
        repository.deleteById(id);
    }

    private Categoria findOrThrow(Long id) {
        return repository.findById(id)
            .orElseThrow(() -> new NotFoundException("Categoria no encontrada con id: " + id));
    }

    private void apply(Categoria entity, CategoriaRequestDTO dto) {
        entity.setNombre(dto.getNombre());
        entity.setDescripcion(dto.getDescripcion());
    }

    private CategoriaResponseDTO toDTO(Categoria c) {
        return new CategoriaResponseDTO(c.getId(), c.getNombre(), c.getDescripcion());
    }
}
