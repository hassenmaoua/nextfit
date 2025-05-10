package org.nextfit.backend.service.plan;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.nextfit.backend.dto.requests.*;
import org.nextfit.backend.dto.responses.*;
import org.nextfit.backend.dto.*;
import org.nextfit.backend.entity.PlanEntity;
import org.nextfit.backend.model.Plan;
import org.nextfit.backend.model.PlanType;

import java.util.List;

public interface IPlanService {

    PlanEntity createPlan(Plan<?> plan, PlanRequest request);

    Plan<PlanType> getPlanById(Long id) throws JsonProcessingException;

    List<PlanDTO> getAllPlansByUserId(Long userId);

    PlanEntity updatePlan(Long planId, String content);

    void deletePlan(Long planId);

    BasicPlanResponse generateBasicPlan(BasicPlanRequest form);

    MealPlanResponse generateMealPlan(MealPlanRequest form);

    DualPlanResponse generateDualPlan(DualPlanRequest form);

    NutritionPlanResponse generateNutritionPlan(NutritionPlanRequest form);

    PremiumPlanResponse generatePremiumPlan(PremiumPlanRequest form);
}
