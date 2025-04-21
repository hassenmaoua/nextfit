package org.nextfit.backend.model;

import lombok.Getter;
import lombok.Setter;
import org.nextfit.backend.enumeration.PlanLevel;
import org.nextfit.backend.model.support.InfoSection;
import org.nextfit.backend.model.support.NutritionGuideline;
import org.nextfit.backend.model.support.WorkoutEntry;

import java.util.List;

@Getter
@Setter
public final class NutritionPlan extends InfoSection implements PlanType {
    private PlanLevel type = PlanLevel.NUTRITION;

    private List<WorkoutEntry> workouts;
    private NutritionGuideline nutrition;

    @Override
    public void displayPlan() {
        System.out.println("Workouts: " + workouts + " | Nutrition: " + nutrition);
    }
}
