package com.midas.goseumdochi.teacher.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "exam_questions")
@Data
public class ExamQuestionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type; // 문제 유형 (multipleChoice, essay)
    private String text; // 문제 텍스트
    private int points; // 배점

    @ElementCollection
    @CollectionTable(name = "exam_question_answers", joinColumns = @JoinColumn(name = "question_id"))
    @Column(name = "answer")
    private List<String> answers; // 답변 목록 (multipleChoice일 경우 보기, essay일 경우 정답)

    private String correctAnswer; // 정답 (multipleChoice일 경우 정답 인덱스, essay일 경우 정답 텍스트)

    @ManyToOne
    @JoinColumn(name = "exam_id")
    private ExamEntity examEntity; // 연관된 시험
}
