package org.nextfit.backend;

import lombok.extern.slf4j.Slf4j;
import org.nextfit.backend.enumeration.UserGender;
import org.nextfit.backend.entity.User;
import org.nextfit.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;


//@EnableJpaAuditing(auditorAwareRef = "auditorAware")

@SpringBootApplication
@Slf4j
public class NextFitBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(NextFitBackendApplication.class, args);
    }

    @Bean
    public CommandLineRunner runner(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        log.info("Running application...");
        log.info("Swagger documentation: http://localhost:14040/api/v1/swagger-ui/index.html#/");
        return args -> {
            if (userRepository.findByUsername("ADMIN").isEmpty()) {
                userRepository.save(User.builder()
                        .firstName("ADMIN")
                        .fullName("ADMIN")
                        .lastName("ADMIN")
                        .username("ADMIN")
                        .phone("00000000")
                        .gender(UserGender.MALE)
                        .password(passwordEncoder.encode("ADMIN"))
                        .email("ADMIN")
                        .accountLocked(false)
                        .enabled(true)
                        .build());
            }
        };
    }

//    @Bean
//    CommandLineRunner commandLineRunner(ChatClient.Builder builder) {
//        return args -> {
//            var client = builder.build();
//
//            String response = client.prompt().user("How many cities in Tunisia?").call().content();
//
//            System.out.println(response);
//        };
//    }
}
