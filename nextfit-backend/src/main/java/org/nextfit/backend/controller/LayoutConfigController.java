package org.nextfit.backend.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.nextfit.backend.entity.LayoutConfig;
import org.nextfit.backend.entity.User;
import org.nextfit.backend.security.AccessService;
import org.nextfit.backend.service.layout.LayoutService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Layout Config", description = "Web Services for Layout Configuration")
@RestController
@AllArgsConstructor
@RequestMapping("/layout-config")
public class LayoutConfigController {
    private final LayoutService layoutService;
    private final AccessService accessService;

    @PostMapping
    public ResponseEntity<LayoutConfig> create(@RequestBody LayoutConfig config) {
        User currentUser = accessService.getCurrentUser();
        config.setUser(currentUser);
        LayoutConfig saved = layoutService.createOrUpdate(config);
        return ResponseEntity.ok(saved);
    }

    @PutMapping
    public ResponseEntity<LayoutConfig> update(@RequestBody LayoutConfig updatedConfig) {
        User currentUser = accessService.getCurrentUser();
        updatedConfig.setUser(currentUser);
        LayoutConfig saved = layoutService.createOrUpdate(updatedConfig);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/by-user")
    public ResponseEntity<LayoutConfig> getByCurrentUser() {
        var user = accessService.getCurrentUser();
        return layoutService.getByUserId(user.getId())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
