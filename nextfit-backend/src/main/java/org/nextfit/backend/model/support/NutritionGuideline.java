package org.nextfit.backend.model.support;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class NutritionGuideline {
    private String intakes;
    private String meals;
    private String hydration;
    private List<String> guidelines;
    private List<String> Supplements;
}
