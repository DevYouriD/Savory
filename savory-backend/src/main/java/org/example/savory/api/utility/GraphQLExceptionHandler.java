package org.example.savory.api.utility;

import graphql.GraphQLError;
import graphql.GraphqlErrorBuilder;
import graphql.schema.DataFetchingEnvironment;
import org.springframework.graphql.data.method.annotation.GraphQlExceptionHandler;
import org.springframework.graphql.execution.ErrorType;
import org.springframework.web.bind.annotation.ControllerAdvice;

@ControllerAdvice
public class GraphQLExceptionHandler {

    @GraphQlExceptionHandler(NotFoundException.class)
    public GraphQLError handleNotFound(NotFoundException ex, DataFetchingEnvironment env) {
        return GraphqlErrorBuilder.newError(env)
                .message(ex.getMessage())
                .errorType(ErrorType.NOT_FOUND)
                .build();
    }

    // Not Found Super Class
    public abstract static class NotFoundException extends RuntimeException {
        protected NotFoundException(String message) {
            super(message);
        }
    }

    // Specified Not Found Child Classes

    public static class RecipeNotFoundException extends NotFoundException {
        public RecipeNotFoundException(String id) {
            super("Recipe not found: " + id);
        }
    }

}
