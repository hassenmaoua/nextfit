package org.nextfit.backend.utils;

import org.springframework.core.io.Resource;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Map;


import java.io.BufferedReader;

import java.io.InputStreamReader;

public class PromptLoader {

    public static Map<String, String> loadPromptParts(Resource resource) {
        try {
            String content = readResourceContent(resource);

            return Map.of(
                    "system", extractSection(content, "-- SYSTEM --", "-- USER --"),
                    "user", extractSection(content, "-- USER --", "-- ASSISTANT --"),
                    "assistant", extractSection(content, "-- ASSISTANT --", "-- FUNCTION --"),
                    "function", extractSection(content, "-- FUNCTION --", null)
            );

        } catch (IOException e) {
            throw new RuntimeException("Failed to read prompt resource", e);
        }
    }

    private static String readResourceContent(Resource resource) throws IOException {
        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8))) {

            StringBuilder contentBuilder = new StringBuilder();
            String line;

            while ((line = reader.readLine()) != null) {
                contentBuilder.append(line).append("\n");
            }

            return contentBuilder.toString();
        }
    }

    private static String extractSection(String content, String startMarker, String endMarker) {
        int startIndex = content.indexOf(startMarker);
        if (startIndex == -1) return "";
        startIndex += startMarker.length();

        int endIndex = endMarker != null ? content.indexOf(endMarker, startIndex) : content.length();
        if (endIndex == -1) endIndex = content.length();

        return content.substring(startIndex, endIndex).trim();
    }
}
