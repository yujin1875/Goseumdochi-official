package com.midas.goseumdochi.teacher.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExamQuestionDTO {
    private Long id;
    private String type; // 문제 유형
    private String text; // 문제 텍스트
    private int points; // 배점
    private List<String> answers; // 답변 목록
    private String correctAnswer; // 정답
    private Long examId; // 연관된 시험 ID
}
