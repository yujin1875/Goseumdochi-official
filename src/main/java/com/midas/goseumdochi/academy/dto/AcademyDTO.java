package com.midas.goseumdochi.academy.dto;

import com.midas.goseumdochi.academy.entity.AcademyEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AcademyDTO {
    private String name;

    public static AcademyDTO fromAcademyEntity(AcademyEntity academyEntity) {
        AcademyDTO dto = new AcademyDTO();
        dto.setName(academyEntity.getName());
        return dto;
    }
}
