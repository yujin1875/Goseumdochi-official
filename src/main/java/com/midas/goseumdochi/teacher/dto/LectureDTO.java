package com.midas.goseumdochi.teacher.dto;

import com.midas.goseumdochi.teacher.entity.LectureEntity;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class LectureDTO {
    private Long id;
    private String name;
    private Long teacherId; // fk
    private Long subjectId; // fk
    private List<LectureTimeDTO> lectureTimeDTOList; // 강의시간 list (join 항목) -> 일단 front랑 주고받을때 사용

    public static LectureDTO toLectureDTO(LectureEntity lectureEntity) {
        LectureDTO lectureDTO = new LectureDTO();
        lectureDTO.setId(lectureEntity.getId());
        lectureDTO.setName(lectureEntity.getName());
        lectureDTO.setTeacherId(lectureEntity.getTeacherEntity().getId());
        lectureDTO.setSubjectId(lectureEntity.getSubjectEntity().getId());

        return lectureDTO;
    }
}
