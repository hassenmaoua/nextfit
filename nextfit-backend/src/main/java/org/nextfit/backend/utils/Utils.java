package org.nextfit.backend.utils;

import org.nextfit.backend.enumeration.TokenType;
import org.nextfit.backend.entity.User;

import java.security.SecureRandom;

public class Utils {

    private Utils() {}

    public static String capitalizeWords(String input) {
        // Check if input string is null
        if (input == null) {
            return null;
        }

        // split the input string into an array of words
        String[] words = input.split("\\s");

        // StringBuilder to store the result
        StringBuilder result = new StringBuilder();

        // iterate through each word
        for (String word : words) {
            // capitalize the first letter, append the rest of the word, and add a space
            result.append(Character.toTitleCase(word.charAt(0)))
                    .append(word.substring(1))
                    .append(" ");
        }

        // convert StringBuilder to String and trim leading/trailing spaces
        return result.toString().trim();
    }

    public static boolean isNotEmpty(String value) {
        return value != null && !value.trim().isEmpty();
    }

    public static String generateTokenCode(int length, TokenType type) {
        String characters = "";
        StringBuilder codeBuilder = new StringBuilder();
        SecureRandom secureRandom = new SecureRandom();

        if (type.equals(TokenType.ACTIVATE_ACCOUNT)) {
            characters = "0123456789";
        }

        if (type.equals(TokenType.RESET_PASSWORD)) {
            characters = "0123456789qwertyuiopasdfghjklzxcvbnm";
        }

        for (int i = 0; i < length; i++) {
            int randomIndex = secureRandom.nextInt(characters.length());
            codeBuilder.append(characters.charAt(randomIndex));
        }

        return codeBuilder.toString();
    }

    public static void formatUserName(User user) {
        String name;

        name = user.getFirstName();
        if (name != null) {
            user.setFirstName(capitalizeWords(name));
        }

        name = user.getLastName();
        if (name != null) {
            user.setLastName(name.toUpperCase());
        }

        user.getFullName();
    }
}
