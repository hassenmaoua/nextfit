package org.nextfit.backend.model.support;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class WorkoutEntry extends InfoSection {
    private String day;
    private List<ExerciseEntry> exercises;
}
