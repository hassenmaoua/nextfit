package org.nextfit.backend.model;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.nextfit.backend.enumeration.PlanLevel;
import org.nextfit.backend.model.support.InfoSection;
import org.nextfit.backend.model.support.NutritionGuideline;
import org.nextfit.backend.model.support.WorkoutEntry;

import java.util.List;

@Getter
@Setter
@Slf4j
public final class NutritionPlan extends InfoSection implements PlanType {
    private PlanLevel type = PlanLevel.NUTRITION;

    private List<WorkoutEntry> workouts;
    private NutritionGuideline nutrition;

    @Override
    public void displayPlan() {
        log.info("Workouts: {}\nNutrition: {}", workouts, nutrition);
    }
}
