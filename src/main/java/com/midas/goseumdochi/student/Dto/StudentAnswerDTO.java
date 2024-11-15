package com.midas.goseumdochi.student.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
public class StudentAnswerDTO {
    private Long id;
    private Long questionId; // 문제 ID
    private Long studentId; // 학생 ID
    private String answer; // 학생이 제출한 답안
    private Long examId;
    private Integer score;

    public StudentAnswerDTO(int totalScore) {
        this.score = totalScore;
    }
    // 기본 생성자에서 score를 -1로 설정
    public StudentAnswerDTO() {
        this.score = -1; // 기본값 설정
    }
}

