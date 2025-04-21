package org.nextfit.backend.model;

import lombok.Getter;
import lombok.Setter;
import org.nextfit.backend.enumeration.PlanLevel;
import org.nextfit.backend.model.support.DietEntry;
import org.nextfit.backend.model.support.InfoSection;
import org.nextfit.backend.model.support.WorkoutEntry;

import java.util.List;

@Getter
@Setter
public final class DualPlan extends InfoSection implements PlanType {
    private PlanLevel type = PlanLevel.DUAL;

    private List<WorkoutEntry> workouts;
    private List<DietEntry> diets;

    @Override
    public void displayPlan() {
        System.out.println("Workouts: " + workouts + " | Diets: " + diets);
    }
}
