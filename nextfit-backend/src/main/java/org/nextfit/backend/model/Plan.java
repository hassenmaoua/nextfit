package org.nextfit.backend.model;

import lombok.Getter;
import lombok.Setter;
import org.nextfit.backend.enumeration.PlanLevel;
import org.nextfit.backend.model.support.InfoSection;

import java.util.List;

@Getter
@Setter
public class Plan<T extends PlanType> extends InfoSection {
    private PlanLevel level;
    private String planConcept;
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
