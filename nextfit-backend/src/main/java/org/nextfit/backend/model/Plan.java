package org.nextfit.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyDescription;
import lombok.Getter;
import lombok.Setter;
import org.nextfit.backend.enumeration.PlanLevel;
import org.nextfit.backend.model.support.InfoSection;

import java.util.List;

@Getter
@Setter
public class Plan<T extends PlanType> extends InfoSection {
    private PlanLevel level;

    @JsonProperty(value = "planConcept", required = true)
    @JsonPropertyDescription("Describes the core idea or theme of the plan. For example: 'Build muscle with bodyweight training' or 'Eat clean to lose fat'. Should be short, motivational, and relevant to the plan goal.")
    private String planConcept;

    @JsonProperty(value = "weeklySchedules", required = true)
    private List<T> weeklySchedules;

    // Constructor with manual level detection
    public Plan(String planConcept, String headline, String subtitle,
                List<T> weeklySchedules) {
        this.planConcept = planConcept;
        this.headline = headline;
        this.subtitle = subtitle;
        this.weeklySchedules = weeklySchedules;
    }

    // No-arg constructor (if needed for frameworks like Jackson)
    public Plan() {
    }

    // Helper method to detect PlanLevel from the content
    public static <D extends PlanType> PlanLevel detectPlanLevel(List<D> schedules) {
        if (schedules == null || schedules.isEmpty()) {
            return PlanLevel.BASIC; // Default
        }

        // Check the first entry (assuming all entries are of the same type)
        Object firstPlan = schedules.iterator().next();

        if (firstPlan instanceof PremiumPlan) {
            return PlanLevel.PREMIUM;
        } else if (firstPlan instanceof MealPlan) {
            return PlanLevel.MEAL;
        } else if (firstPlan instanceof DualPlan) {
            return PlanLevel.DUAL;
        } else if (firstPlan instanceof NutritionPlan) {
            return PlanLevel.NUTRITION;
        } else {
            return PlanLevel.BASIC;
        }
    }
}
