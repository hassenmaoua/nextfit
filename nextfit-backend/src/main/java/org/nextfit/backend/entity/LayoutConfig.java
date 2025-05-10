package org.nextfit.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.nextfit.backend.enumeration.Language;
import org.nextfit.backend.enumeration.LayoutPrimary;

import java.io.Serializable;

@Data
@Builder
@Entity
@Table(name = "layout_config")
@AllArgsConstructor
@NoArgsConstructor
public class LayoutConfig implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @JsonProperty("primary")
    private LayoutPrimary primaryColor;

    private String preset;

    private boolean darkTheme;

    @Column(columnDefinition = "VARCHAR(20) DEFAULT 'static'")
    private String menuMode;

    @Enumerated(EnumType.STRING)
    private Language language;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonIgnore
    private User user;
}
