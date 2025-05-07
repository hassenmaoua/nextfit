package org.nextfit.backend.model.support;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyDescription;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class MealEntry {
    @JsonProperty(value = "time", required = true)
    private String time;

    @JsonProperty(value = "mealType", required = true)
    private String mealType;

    @JsonProperty(value = "mealDescription", required = true)
    @JsonPropertyDescription("Additional information about meal like alternative or more optionals")
    private String mealDescription;
}

