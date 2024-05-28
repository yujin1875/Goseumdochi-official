package com.midas.goseumdochi.teacher.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class LectureRegistDTO {
    List<LectureDTO> registLectureDTOList;
    List<LectureDTO> notRegistLectureDTOList;
}
