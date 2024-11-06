package com.midas.goseumdochi.student.entity;

import com.midas.goseumdochi.teacher.entity.ExamQuestionEntity;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "student_answers")
@Data
public class StudentAnswerEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long studentId;

    private String answer; // 학생이 제출한 답안

    @ManyToOne
    @JoinColumn(name = "question_id")
    private ExamQuestionEntity question; // 연결된 문제
}