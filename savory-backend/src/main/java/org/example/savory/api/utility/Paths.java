package org.example.savory.api.utility;

public final class Paths {

    /**
     * The base of all rest api paths.
     */
    private static final String BASE_PATH = "/api/v1";

    /**
     * User paths.
     */
    private static final String BASE_USER_PATH = BASE_PATH + "/user";

    public static final String CREATE_USER = BASE_USER_PATH + "/create";

    public static final String GET_ALL_USERS = BASE_USER_PATH + "/get-all";

    public static final String GET_USER_BY_ID = BASE_USER_PATH + "/get/{id}";

    public static final String UPDATE_USER = BASE_USER_PATH + "/update/{id}";

    public static final String DELETE_USER = BASE_USER_PATH + "/delete/{id}";

    private Paths() { /* Empty constructor to prohibit initialisation. */ }

}
