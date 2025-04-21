package org.nextfit.backend.dto.requests;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.nextfit.backend.enumeration.PlanLevel;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DualPlanRequest  implements PlanRequest {
    private PlanLevel level = PlanLevel.DUAL;
    private BasicPlanRequest basicPlan;  // Composition for basic logic
    private MealPlanRequest mealPlan;   // Composition for meal logic

}
