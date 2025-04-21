// FormDTO.java
package org.nextfit.backend.dto;

import lombok.Data;

import java.util.List;

@Data
public class FormDTO {

    // Fitness Goals
    private String primaryGoal; // 'lose Weight' | 'gain Muscle' | 'improve strength' | 'enhance endurance' | 'general fitness'
    private Double targetWeight;
    private int timelineWeeks;
    private boolean hasGymAccess;
    private List<String> exerciseTypes;
    private String exerciseFrequency; // '1 time/week' | '1-2x/week' | '3-4x/week' | '5+ times/week'
    private String motivation;

    // Personal Information
    private String gender; // 'male' | 'female'
    private int age;
    private int weight;
    private int height;
    private String currentActivity; // 'never' | '1-2x/week' | '3-4x/week' | '5+ times/week'

    // Health & Medical Background
    private Boolean hasMedicalConditions;
    private String medicalDetails;
    private String injuries;
    private List<String> medications;
    private List<String> allergies;
    private boolean smokes;
    private String alcoholConsumption; // 'none' | 'occasional' | 'frequent'

    // Nutrition
    private boolean tracksFood;
    private int mealsPerDay;
    private List<String> dietaryRestrictions;
    private double waterIntake;

    // Sleep & Recovery
    private double sleepHours;
    private int stressLevel;
    private List<String> recoveryHabits;

    // Additional Info
    private String exercisePreferences;
    private String exerciseDislikes;
    private String previousExperience;
    private String otherConcerns;

    // Getters and Setters...

    // Optionally: override toString(), equals(), hashCode() if needed
}

