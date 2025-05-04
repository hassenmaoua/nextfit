package org.nextfit.backend.model.support;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyDescription;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExerciseEntry {
    @JsonProperty(value = "name", required = true)
    private String name;

    @JsonProperty(value = "focus", required = true)
    @JsonPropertyDescription("Generally group of exercises or a type of exercise")
    private String focus;

    @JsonProperty(value = "description", required = true)
    @JsonPropertyDescription("reps, sets, time, notes etc...")
    private String description;
}
