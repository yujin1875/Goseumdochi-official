package com.midas.goseumdochi.teacher.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    private int points; // 배점

    @ManyToOne
    @JoinColumn(name = "lecture_id")
    @JsonIgnore
    private LectureEntity lectureEntity;

    @OneToMany(mappedBy = "examEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ExamQuestionEntity> questions;

}
