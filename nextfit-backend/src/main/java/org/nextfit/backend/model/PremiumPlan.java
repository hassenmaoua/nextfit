package org.nextfit.backend.model;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.nextfit.backend.enumeration.PlanLevel;
import org.nextfit.backend.model.support.*;

import java.util.List;


@Getter
@Setter
@Slf4j
public final class PremiumPlan extends InfoSection implements PlanType {
    private PlanLevel type = PlanLevel.PREMIUM;

    private List<WorkoutEntry> workouts;
    private List<DietEntry> diets;
    private NutritionGuideline nutrition;

    @Override
    public void displayPlan() {
        log.info("Full Fitness Plan (All Features)");
    }
}