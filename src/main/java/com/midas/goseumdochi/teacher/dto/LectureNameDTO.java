package com.midas.goseumdochi.teacher.dto;

import com.midas.goseumdochi.teacher.entity.LectureEntity;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class LectureNameDTO { // 강의 이름만 저장한 dto
    public Long id; // 강의 id
    private String name; // 강의 이름

    public static LectureNameDTO toLectureNameDTO(LectureEntity lectureEntity) {
        LectureNameDTO lectureNameDTO = new LectureNameDTO(lectureEntity.getId(), lectureEntity.getName());
        return lectureNameDTO;
    }
}
