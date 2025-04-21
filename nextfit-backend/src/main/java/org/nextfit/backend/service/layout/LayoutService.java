package org.nextfit.backend.service.layout;

import lombok.RequiredArgsConstructor;
import org.nextfit.backend.entity.LayoutConfig;
import org.nextfit.backend.repository.LayoutConfigRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LayoutService implements ILayoutService{
    private final LayoutConfigRepository layoutConfigRepository;

    @Override
    public LayoutConfig createOrUpdate(LayoutConfig config) {
        // Assuming User is already attached or validated
        return layoutConfigRepository.save(config);
    }

    @Override
    public Optional<LayoutConfig> getByUserId(Long userId) {
        return layoutConfigRepository.findByUserId(userId);
    }
}
