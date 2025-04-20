package org.pwr.deskmateserver.utils;

public class FileUtils {
    public static String getExtension(String filename) {
        return filename.substring(filename.lastIndexOf(".") + 1);
    }
}
