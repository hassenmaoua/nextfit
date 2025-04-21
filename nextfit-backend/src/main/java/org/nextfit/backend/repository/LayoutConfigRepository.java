package org.nextfit.backend.repository;

import org.nextfit.backend.entity.LayoutConfig;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LayoutConfigRepository extends JpaRepository<LayoutConfig, Long> {
    Optional<LayoutConfig> findByUserId(Long userId);
}