package org.nextfit.backend.model;

import lombok.Getter;
import lombok.Setter;
import org.nextfit.backend.enumeration.PlanLevel;
import org.nextfit.backend.model.support.*;

import java.util.List;


@Getter
@Setter
public final class PremiumPlan extends InfoSection implements PlanType {
    private PlanLevel type = PlanLevel.PREMIUM;

    private List<WorkoutEntry> workouts;
    private List<DietEntry> diets;
    private NutritionGuideline nutrition;

    @Override
    public void displayPlan() {
        System.out.println("Full Fitness Plan (All Features)");
    }
}