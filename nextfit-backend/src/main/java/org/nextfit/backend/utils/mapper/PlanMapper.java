package org.nextfit.backend.utils.mapper;

import lombok.extern.slf4j.Slf4j;
import org.nextfit.backend.dto.PlanDTO;
import org.nextfit.backend.entity.PlanEntity;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class PlanMapper {

    public static PlanDTO toPlanDTO(PlanEntity plan) {
        if (plan == null) {
            return null;
        }
        PlanDTO planDTO = new PlanDTO();
        return PlanDTO.builder().id(plan.getId()).name(plan.getName()).build();
    }
}
