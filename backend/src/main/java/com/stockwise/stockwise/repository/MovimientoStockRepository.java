package com.stockwise.stockwise.repository;

import com.stockwise.stockwise.entity.MovimientoStock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovimientoStockRepository extends JpaRepository<MovimientoStock, Long> {
    List<MovimientoStock> findByProductoIdOrderByFechaDesc(Long productoId);
}
