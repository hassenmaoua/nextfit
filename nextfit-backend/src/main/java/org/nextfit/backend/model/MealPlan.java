package org.nextfit.backend.model;

import lombok.Getter;
import lombok.Setter;
import org.nextfit.backend.enumeration.PlanLevel;
import org.nextfit.backend.model.support.DietEntry;
import org.nextfit.backend.model.support.InfoSection;

import java.util.List;

@Getter
@Setter
public final class MealPlan extends InfoSection implements PlanType {
    private PlanLevel type = PlanLevel.MEAL;

    private List<DietEntry> diets;

    @Override
    public void displayPlan() {
        System.out.println("Diets: " + diets);
    }
}
