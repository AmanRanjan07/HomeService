package com.homeservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaAuditing
@ComponentScan(basePackages = {"com.homeservice", "com.homeservices"})
@EntityScan(basePackages = {"com.homeservice"})
@EnableJpaRepositories(basePackages = {"com.homeservice.repository"})
public class HomeServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(HomeServiceApplication.class, args);
    }
} 