package org.example.savory;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.jdbc.autoconfigure.DataSourceAutoConfiguration;
import org.springframework.boot.mongodb.autoconfigure.MongoAutoConfiguration;

// Disable SQL autoconfiguration when not using MySql

@SpringBootApplication
@EnableAutoConfiguration(exclude={MongoAutoConfiguration.class, DataSourceAutoConfiguration.class})
public class SavoryApplication {

    public static void main(String[] args) {
        SpringApplication.run(SavoryApplication.class, args);
    }

}
