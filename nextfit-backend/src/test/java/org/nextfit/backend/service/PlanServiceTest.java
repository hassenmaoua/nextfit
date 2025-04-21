package org.nextfit.backend.service;

import org.junit.jupiter.api.Test;
import org.nextfit.backend.dto.FormDTO;
import org.nextfit.backend.dto.PlanDTO;
import org.nextfit.backend.service.plan.PlanService;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;

@SpringBootTest
class PlanServiceTest {

    @Autowired
    private PlanService service;

    @Autowired
    private ChatClient chatClient;

    @Test
    void shouldGeneratePlan() throws Exception {
    }
}