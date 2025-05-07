package org.nextfit.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import org.nextfit.backend.enumeration.PlanLevel;
import org.nextfit.backend.model.support.DietEntry;
import org.nextfit.backend.model.support.InfoSection;

import java.util.List;

@Getter
@Setter
public final class MealPlan extends InfoSection implements PlanType {
    @JsonProperty(value = "type", required = true, defaultValue = "MEAL")
    private PlanLevel type = PlanLevel.MEAL;

    @JsonProperty(value = "diets", required = true)
    private List<DietEntry> diets;

    @Override
    public void displayPlan() {
        System.out.println("Diets: " + diets);
    }
}
