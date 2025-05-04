package org.nextfit.backend.model.support;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyDescription;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class WorkoutEntry extends InfoSection {
    @JsonProperty(value = "day", required = true)
    @JsonPropertyDescription("e.g. (Day 1, Day 2, Day 3 ... etc) or (Monday, Tuesday ... etc)")
    private String day;

    @Size(min = 5)
    @JsonProperty(value = "exercises", required = true)
    @JsonPropertyDescription("Must contain at least 5 exercise.")
    private List<ExerciseEntry> exercises;
}
