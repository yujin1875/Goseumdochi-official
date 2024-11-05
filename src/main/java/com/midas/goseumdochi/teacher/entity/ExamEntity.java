package com.midas.goseumdochi.teacher.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "exams")
@Data
@Getter
@Setter
public class ExamEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String examMethod;
    private LocalDateTime openDate;
    private LocalDateTime examPeriodStart;
    private LocalDateTime examPeriodEnd;
    private int duration;
    private boolean scorePublished;
    private LocalDateTime scorePublishDate;
    private int points; // 배점
    private boolean isOngoing; // 진행상황
    private int submissionCount; // 제출인원
    private double evaluationScore; // 평가점수

    @ManyToOne
    @JoinColumn(name = "lecture_id")
    private LectureEntity lectureEntity;

    @OneToMany(mappedBy = "examEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ExamQuestionEntity> questions;

}
