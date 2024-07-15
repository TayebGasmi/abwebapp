package com.appointment.booking.utils;

import java.util.Random;

public class CodeGenerationUtil {

    private static final Random random = new Random();

    public static String generate4DigitCode() {
        int code = 1000 + random.nextInt(9000);
        return String.valueOf(code);
    }

    private CodeGenerationUtil() {
    }
}
