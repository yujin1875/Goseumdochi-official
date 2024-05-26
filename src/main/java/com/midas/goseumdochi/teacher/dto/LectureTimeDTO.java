package com.midas.goseumdochi.teacher.dto;

import com.midas.goseumdochi.teacher.entity.LectureTimeEntity;
import lombok.*;

import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class LectureTimeDTO {
    private Long id;
    private String day;
    private LocalTime startTime;
    private LocalTime endTime;
    private Long LectureId; // fk

    public static LectureTimeDTO toLectureTimeDTO(LectureTimeEntity lectureTimeEntity) {
        LectureTimeDTO lectureTimeDTO = new LectureTimeDTO();
        lectureTimeDTO.setId(lectureTimeEntity.getId());
        lectureTimeDTO.setDay(lectureTimeEntity.getDay());
        lectureTimeDTO.setStartTime(lectureTimeEntity.getStartTime());
        lectureTimeDTO.setEndTime(lectureTimeEntity.getEndTime());
        lectureTimeDTO.setLectureId(lectureTimeEntity.getLectureEntity().getId());

       return lectureTimeDTO;
    }
}
