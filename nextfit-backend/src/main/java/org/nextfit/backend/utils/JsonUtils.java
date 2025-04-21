package org.nextfit.backend.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.nextfit.backend.dto.requests.BasicPlanRequest;
import org.nextfit.backend.dto.requests.PlanRequest;
import org.nextfit.backend.model.Plan;

public class JsonUtils {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    // Convert PlanType to JSON
    public static String toJson(Plan<?> plan) {
        try {
            return objectMapper.writeValueAsString(plan);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to convert BasicPlan to JSON", e);
        }
    }

    // Convert JSON to GeneratedPlan
    public static Plan<?> toPlan(String json) {
        try {
            return objectMapper.readValue(json, Plan.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to parse JSON to BasicPlan", e);
        }
    }

    // Convert BasicPlanRequest to JSON
    public static String toJson(PlanRequest request) {
        try {
            return objectMapper.writeValueAsString(request);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to convert BasicPlanRequest to JSON", e);
        }
    }

    // Convert JSON to BasicPlanRequest
    public static BasicPlanRequest toBasicPlanRequest(String json) {
        try {
            return objectMapper.readValue(json, BasicPlanRequest.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to parse JSON to BasicPlanRequest", e);
        }
    }
}
