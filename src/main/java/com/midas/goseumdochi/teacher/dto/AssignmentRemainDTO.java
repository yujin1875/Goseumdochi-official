package com.midas.goseumdochi.teacher.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AssignmentRemainDTO {
    private Long id; // 과제 id
    private String title;   // 과제 제목
    private int dDay; // D-day
    private String lectureName;  // 강의 이름
    private Long lectureId; // 강의 id (pk)
}
