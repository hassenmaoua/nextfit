package org.nextfit.backend.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.nextfit.backend.dto.*;
import org.nextfit.backend.dto.requests.*;
import org.nextfit.backend.entity.PlanEntity;
import org.nextfit.backend.model.Plan;
import org.nextfit.backend.security.AccessService;
import org.nextfit.backend.service.plan.PlanService;
import org.nextfit.backend.utils.mapper.PlanMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Plans", description = "Web Services for Planner Generator")
@RestController
@AllArgsConstructor
@RequestMapping("/plans")
public class PlanController {

    private final PlanService planService;
    private final AccessService accessService;

    @PostMapping("/generate")
    public ResponseEntity<PlanDTO> createPlan(@Valid @RequestBody PlanRequest request) {
        PlanEntity response;

        switch (request.getLevel()) {
            case BASIC -> {
                var form = (BasicPlanRequest) request;
                var basic = planService.generateBasicPlan(form);
                response = planService.createPlan(basic, form);
            }
            case MEAL -> {
                var form = (MealPlanRequest) request;
                var meal = planService.generateMealPlan(form);
                response = planService.createPlan(meal, form);
            }
            case DUAL -> {
                var form = (DualPlanRequest) request;
                var dual = planService.generateDualPlan(form);
                response = planService.createPlan(dual, form);
            }
            case NUTRITION -> {
                var form = (NutritionPlanRequest) request;
                var nutrition = planService.generateNutritionPlan(form);
                response = planService.createPlan(nutrition, form);
            }
            case PREMIUM -> {
                var form = (PremiumPlanRequest) request;
                var premium = planService.generatePremiumPlan(form);
                response = planService.createPlan(premium, form);
            }
            default -> throw new RuntimeException("Invalid plan level");
        }

        return ResponseEntity.ok(PlanMapper.toPlanDTO(response));
    }

    @GetMapping("/{planId}")
    public ResponseEntity<Plan<?>> getPlanById(@PathVariable Long planId) {
        var plan = planService.getPlanById(planId);
        return ResponseEntity.ok(plan);
    }

    @GetMapping
    public ResponseEntity<List<PlanDTO>> getAllPlansByUser() {
        var currentUser = accessService.getCurrentUser();
//        if (!Objects.equals(userId, currentUser.getId())) {
//            throw new ForbiddenException("You do not have access to get the plans");
//        }
        List<PlanDTO> plans = planService.getAllPlansByUserId(currentUser.getId());
        return ResponseEntity.ok(plans);
    }

    @PutMapping("/{planId}")
    public ResponseEntity<PlanEntity> updatePlan(
            @PathVariable Long planId,
            @RequestBody String content) {
        PlanEntity updatedPlan = planService.updatePlan(planId, content);
        return ResponseEntity.ok(updatedPlan);
    }

    @DeleteMapping("/{planId}")
    public ResponseEntity<Void> deletePlan(
            @PathVariable Long planId) {
        planService.deletePlan(planId);
        return ResponseEntity.noContent().build();
    }
}