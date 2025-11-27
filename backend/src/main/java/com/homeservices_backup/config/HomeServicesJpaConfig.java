package com.homeservices_backup.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(
    basePackages = "com.homeservices.repository",
    entityManagerFactoryRef = "homeservicesEntityManagerFactory",
    transactionManagerRef = "homeservicesTransactionManager"
)
public class HomeServicesJpaConfig {
    // The actual bean definitions are in the main JpaConfig class
} 