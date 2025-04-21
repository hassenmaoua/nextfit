package org.nextfit.backend.service.layout;

import org.nextfit.backend.entity.LayoutConfig;

import java.util.Optional;

public interface ILayoutService {
    LayoutConfig createOrUpdate(LayoutConfig config);
    Optional<LayoutConfig> getByUserId(Long userId);
}
