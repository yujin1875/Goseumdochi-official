package com.midas.goseumdochi.academy.dto;

import com.midas.goseumdochi.academy.entity.SubjectEntity;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SubjectDTO {
    private Long id;
    private String name;
    private Long directorId;

    // Entity -> DTO
    public static SubjectDTO toSubjectDTO(SubjectEntity subjectEntity) {
        SubjectDTO subjectDTO = new SubjectDTO();
        subjectDTO.setId(subjectEntity.getId());
        subjectDTO.setName(subjectEntity.getName());
        subjectDTO.setDirectorId(subjectEntity.getDirectorEntity().getId());

        return subjectDTO;
    }
}
