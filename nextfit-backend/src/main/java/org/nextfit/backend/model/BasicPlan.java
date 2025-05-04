package org.nextfit.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.nextfit.backend.enumeration.PlanLevel;
import org.nextfit.backend.model.support.InfoSection;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import org.nextfit.backend.model.support.WorkoutEntry;

@Getter
@Setter
public final class BasicPlan extends InfoSection implements PlanType {
    private PlanLevel type = PlanLevel.BASIC;

    @JsonProperty(value = "workouts", required = true)
    private List<WorkoutEntry> workouts;

    @Override
    public void displayPlan() {
        System.out.println("Basic Workouts: " + workouts);
    }

   }