# ---------- BUILD STAGE ----------
FROM gradle:8.14.3-jdk21 AS builder
WORKDIR /app

COPY gradle gradle
COPY gradlew .
RUN chmod +x gradlew
COPY settings.gradle.kts .
COPY build.gradle.kts .
COPY src src

RUN ./gradlew bootJar --no-daemon -x test

# ---------- RUNTIME STAGE ----------
FROM eclipse-temurin:21-jre-jammy

# Non-root user
RUN useradd -ms /bin/bash appuser
USER appuser

WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]