package com.stockwise.stockwise.repository;

import com.stockwise.stockwise.entity.Proveedor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProveedorRepository extends JpaRepository<Proveedor, Long> {
    boolean existsByEmailIgnoreCase(String email);
}
