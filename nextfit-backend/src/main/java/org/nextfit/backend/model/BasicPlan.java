package org.nextfit.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.extern.slf4j.Slf4j;
import org.nextfit.backend.enumeration.PlanLevel;
import org.nextfit.backend.model.support.InfoSection;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import org.nextfit.backend.model.support.WorkoutEntry;

@Getter
@Setter
@Slf4j
public final class BasicPlan extends InfoSection implements PlanType {
    @JsonProperty(value = "type", required = true, defaultValue = "BASIC")
    private PlanLevel type = PlanLevel.BASIC;

    @JsonProperty(value = "workouts", required = true)
    private List<WorkoutEntry> workouts;

    @Override
    public void displayPlan() {
        log.info("Basic Workouts: {}", workouts);
    }

}