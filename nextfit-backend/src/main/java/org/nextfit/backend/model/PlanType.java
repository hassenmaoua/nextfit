package org.nextfit.backend.model;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import org.nextfit.backend.enumeration.PlanLevel;

@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.PROPERTY,
        property = "type" // This key must exist in your JSON to tell Jackson what subtype to use
)
@JsonSubTypes({
        @JsonSubTypes.Type(value = BasicPlan.class, name = "BASIC"),
        @JsonSubTypes.Type(value = MealPlan.class, name = "MEAL"),
        @JsonSubTypes.Type(value = DualPlan.class, name = "DUAL"),
        @JsonSubTypes.Type(value = NutritionPlan.class, name = "NUTRITION"),
        @JsonSubTypes.Type(value = PremiumPlan.class, name = "PREMIUM"),
})
public sealed interface PlanType permits BasicPlan, MealPlan, DualPlan, NutritionPlan, PremiumPlan {
    void displayPlan();
    PlanLevel getType();
}