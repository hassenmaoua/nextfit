package org.nextfit.backend.enumeration;

public enum MenuMode {
    STATIC("static"),
    OVERLAY("overlay");

    private final String label;

    MenuMode(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }

    public static MenuMode fromLabel(String label) {
        for (MenuMode mode : values()) {
            if (mode.label.equalsIgnoreCase(label)) {
                return mode;
            }
        }
        throw new IllegalArgumentException("Unknown label: " + label);
    }
}
