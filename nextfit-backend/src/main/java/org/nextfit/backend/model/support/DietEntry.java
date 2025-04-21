package org.nextfit.backend.model.support;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class DietEntry extends InfoSection {
    private String day;
    private List<MealEntry> meals;
}
