// Quality plugin versions
//val pmdVersion = "7.7.0"
//val checkstyleVersion = "10.20.1"
//val jacocoVersion = "0.8.12"

// Dependency versions
val lombokVersion = "1.18.42"
val mysqlConnectorJavaVersion = "8.0.33"
val plantUmlVersion = "8059"

plugins {
    java
    id("org.springframework.boot") version "4.0.3"
    id("io.spring.dependency-management") version "1.1.7"
    //	id("pmd")
    //	id("checkstyle")
    //	id("jacoco")
}

group = "org.example"
version = "0.0.1-SNAPSHOT"
description = "Savory"

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(21)
    }
}

configurations {
    compileOnly {
        extendsFrom(configurations.annotationProcessor.get())
    }
}

repositories {
    mavenCentral()
}

dependencies {

    // UTILITY
    implementation("org.springframework.boot:spring-boot-starter-web")
    // implementation("org.springframework.boot:spring-boot-starter-graphql")
    compileOnly("org.projectlombok:lombok:$lombokVersion")
    annotationProcessor("org.projectlombok:lombok:$lombokVersion")

    // SECURITY
    implementation("org.springframework.boot:spring-boot-starter-security")

    // FRONTEND
    implementation("org.springframework.boot:spring-boot-starter-thymeleaf")
    implementation("org.thymeleaf.extras:thymeleaf-extras-springsecurity6")

    // DATA STORAGE
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("mysql:mysql-connector-java:${mysqlConnectorJavaVersion}")

    // DOCUMENTATION
    implementation("net.sourceforge.plantuml:plantuml:${plantUmlVersion}")

    // TESTING
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.springframework.security:spring-security-test")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")

}

// Plugin configuration

// PMD

//tasks.withType<Pmd> {
//	reports {
//		html.required.set(true)
//		xml.required.set(false)
//	}
//	ignoreFailures = false
//}

// CHECKSTYLE

//tasks.withType<Checkstyle> {
//	configFile = file("config/checkstyle/sun_checks.xml")
//	reports {
//		html.required.set(true)
//		xml.required.set(false)
//	}
//	ignoreFailures = false
//}

// JACOCO

//tasks.jacocoTestReport {
//	dependsOn(tasks.withType<Test>())
//	reports {
//		html.required.set(true)
//		xml.required.set(false)
//	}
//
//	doLast {
//		// Print report browser link to console
//		val reportFile = file("${layout.buildDirectory.get().asFile}/reports/jacoco/test/html/index.html")
//		val fileUrl = reportFile.toURI().toString().removePrefix("file:")
//		println("View report at: file:///$fileUrl")
//	}
//}

tasks.withType<Test> {
    useJUnitPlatform()
}
