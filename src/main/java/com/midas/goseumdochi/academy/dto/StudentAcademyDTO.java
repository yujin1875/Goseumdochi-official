package com.midas.goseumdochi.academy.dto;

import com.midas.goseumdochi.academy.entity.StudentAcademyEntity;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class StudentAcademyDTO {
    private Long id;
    private Long studentId;
    private Long academyId;

    public static StudentAcademyDTO toStudentAcademyDTO(StudentAcademyEntity studentAcademyEntity) {
        StudentAcademyDTO studentAcademyDTO = new StudentAcademyDTO(studentAcademyEntity.getId()
                , studentAcademyEntity.getStudentEntity().getId()
                , studentAcademyEntity.getAcademyEntity().getId());
        return studentAcademyDTO;
    }
}
