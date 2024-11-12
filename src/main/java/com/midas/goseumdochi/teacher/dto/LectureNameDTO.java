package com.midas.goseumdochi.teacher.dto;

import com.midas.goseumdochi.teacher.entity.LectureEntity;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class LectureNameDTO { // 강의 이름만 저장한 dto
    private Long id; // 강의 id
    private String name; // 강의 이름

    public static LectureNameDTO toLectureNameDTO(LectureEntity lectureEntity) {
        LectureNameDTO lectureNameDTO = new LectureNameDTO(lectureEntity.getId(), lectureEntity.getName());
        return lectureNameDTO;
    }

    public static List<LectureNameDTO> toLectureNameDTOList(List<LectureEntity> lectureEntityList) {
        List<LectureNameDTO> lectureNameDTOList = new ArrayList<>();
        for (LectureEntity lecture : lectureEntityList)
            lectureNameDTOList.add(toLectureNameDTO(lecture));
        return lectureNameDTOList;
    }
}
