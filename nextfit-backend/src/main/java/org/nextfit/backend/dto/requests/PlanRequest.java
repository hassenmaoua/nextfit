package org.nextfit.backend.dto.requests;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import io.swagger.v3.oas.annotations.media.Schema;
import org.nextfit.backend.enumeration.PlanLevel;

@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.EXISTING_PROPERTY,
        property = "level",
        visible = true
)
@JsonSubTypes({
        @JsonSubTypes.Type(value = BasicPlanRequest.class, name = "BASIC"),
        @JsonSubTypes.Type(value = MealPlanRequest.class, name = "MEAL"),
        @JsonSubTypes.Type(value = DualPlanRequest.class, name = "DUAL"),
        @JsonSubTypes.Type(value = NutritionPlanRequest.class, name = "NUTRITION"),
        @JsonSubTypes.Type(value = PremiumPlanRequest.class, name = "PREMIUM")
})
@Schema(
        description = "Base plan request",
        discriminatorProperty = "level",
        oneOf = {
                BasicPlanRequest.class,
                MealPlanRequest.class,
                DualPlanRequest.class,
                NutritionPlanRequest.class,
                PremiumPlanRequest.class
        }
)
public interface PlanRequest {
    PlanLevel getLevel();
}
