package org.nextfit.backend.repository;

import org.nextfit.backend.entity.PlanEntity;
import org.nextfit.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlanRepository extends JpaRepository<PlanEntity, Long> {
    List<PlanEntity> findByUser(User user);
    List<PlanEntity> findByUserIdOrderByUpdatedAtDesc(Long userId);
}