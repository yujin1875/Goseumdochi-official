package com.midas.goseumdochi.teacher.dto;

import com.midas.goseumdochi.teacher.entity.LectureEntity;
import com.midas.goseumdochi.teacher.entity.LectureTimeEntity;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class LectureDTO {
    private Long id;
    private String name;
    private int maxCount;
    private int headCount;
    private Long teacherId; // fk
    private Long subjectId; // fk
    private List<LectureTimeDTO> lectureTimeDTOList; // 강의시간 list (join 항목) -> 일단 front랑 주고받을때 사용

    public static LectureDTO toLectureDTO(LectureEntity lectureEntity) {
        LectureDTO lectureDTO = new LectureDTO();
        lectureDTO.setId(lectureEntity.getId());
        lectureDTO.setName(lectureEntity.getName());
        lectureDTO.setMaxCount(lectureEntity.getMaxCount());
        lectureDTO.setHeadCount(lectureDTO.getHeadCount());
        lectureDTO.setTeacherId(lectureEntity.getTeacherEntity().getId());
        lectureDTO.setSubjectId(lectureEntity.getSubjectEntity().getId());

        return lectureDTO;
    }

    // ENTITY -> DTO (강의 시간도 set)
    public static LectureDTO toLectureAndTimeDTO(LectureEntity lectureEntity) {
        LectureDTO lectureDTO = toLectureDTO(lectureEntity);
        lectureDTO.setLectureTimeDTOListToEntity(lectureEntity.getLectureTimeEntityList());

        return lectureDTO;
    }

    // 강의시간 엔터티 list -> 강의시간 dto list (강의시간을 사용할 때만 set하기 위해)
    public void setLectureTimeDTOListToEntity(List<LectureTimeEntity> lectureTimeEntityList) {
        List<LectureTimeDTO> lectureTimeDTOList = new ArrayList<>();
        for (LectureTimeEntity entity : lectureTimeEntityList)
            lectureTimeDTOList.add(LectureTimeDTO.toLectureTimeDTO(entity));
        this.setLectureTimeDTOList(lectureTimeDTOList);
    }
}
