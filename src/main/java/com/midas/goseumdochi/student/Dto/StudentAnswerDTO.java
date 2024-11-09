package com.midas.goseumdochi.student.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentAnswerDTO {
    private Long id;
    private Long questionId; // 문제 ID
    private Long studentId; // 학생 ID
    private String answer; // 학생이 제출한 답안
    private Long examId;
    private Integer score;
}

