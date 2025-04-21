package org.nextfit.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.nextfit.backend.enumeration.PlanLevel;

import java.time.LocalDateTime;

@Data
@Builder
@Entity
@Table(name = "plans")
@AllArgsConstructor
@NoArgsConstructor
public class PlanEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "level", nullable = false)
    private PlanLevel level;

    @Column(columnDefinition = "json", nullable = false)
//    @Convert(converter = JsonConverter.class)
    private String content;

    @Column(columnDefinition = "json", nullable = true)
//    @Convert(converter = JsonConverter.class)
    private String input;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}