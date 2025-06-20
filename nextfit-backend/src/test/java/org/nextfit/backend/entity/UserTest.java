package org.nextfit.backend.entity;

import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDate;

import org.junit.jupiter.api.Test;

class UserTest {

    @Test
    void testFullName_WithLastName() {
        User user = new User();
        user.setFirstName("john");
        user.setLastName("doe");

        String fullName = user.getFullName();

        assertEquals("John DOE", fullName);
    }

    @Test
    void testGetAge_ShouldReturnCorrectAge() {
        User user = new User();
        user.setBirthDate(LocalDate.of(2000, 1, 1));

        int age = user.getAge();

        assertTrue(age >= 24); // depending on current year
    }

    @Test
    void testGetAge_WhenBirthDateNull_ShouldReturnZero() {
        User user = new User();
        user.setBirthDate(null);

        assertEquals(0, user.getAge());
    }
}
