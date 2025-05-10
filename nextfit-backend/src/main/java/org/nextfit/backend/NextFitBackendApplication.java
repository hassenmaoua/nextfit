package org.nextfit.backend;

import lombok.extern.slf4j.Slf4j;
import org.nextfit.backend.enumeration.UserGender;
import org.nextfit.backend.entity.User;
import org.nextfit.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.net.InetAddress;

//@EnableJpaAuditing(auditorAwareRef = "auditorAware")

@EnableScheduling
@EnableAsync
@SpringBootApplication
@Slf4j
public class NextFitBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(NextFitBackendApplication.class, args);
    }


    @Bean
    public CommandLineRunner swaggerLog(
            ServletWebServerApplicationContext context,
            @Value("${server.servlet.context-path:/}") String contextPath,
            @Value("${springdoc.swagger-ui.path:/swagger-ui.html}") String swaggerPath
    ) {
        return args -> {
            int port = context.getWebServer().getPort();
            String host = InetAddress.getLocalHost().getHostAddress(); // or "localhost"

            // Create local copies to safely modify
            String ctxPath = contextPath;
            String swgPath = swaggerPath;

            if (!ctxPath.startsWith("/")) ctxPath = "/" + ctxPath;
            if (!ctxPath.endsWith("/")) ctxPath += "/";
            if (swgPath.startsWith("/")) swgPath = swgPath.substring(1);

            String swaggerUrl = String.format("http://%s:%d%s%s", host, port, ctxPath, swgPath);
            log.info("Swagger documentation: {}", swaggerUrl);
        };
    }



    @Bean
    public CommandLineRunner runner(UserRepository userRepository, PasswordEncoder passwordEncoder) {

        return args -> {
            final String defaultUser = "ADMIN";
            if (userRepository.findByUsername(defaultUser).isEmpty()) {
                userRepository.save(User.builder()
                        .firstName(defaultUser)
                        .fullName(defaultUser)
                        .lastName(defaultUser)
                        .username(defaultUser)
                        .phone("00000000")
                        .gender(UserGender.MALE)
                        .password(passwordEncoder.encode(defaultUser))
                        .email(defaultUser)
                        .accountLocked(false)
                        .enabled(true)
                        .build());
            }
        };
    }
}
