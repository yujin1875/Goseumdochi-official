package com.midas.goseumdochi.teacher.entity;

import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import jakarta.persistence.*;

import java.time.LocalDateTime;
@Entity
@Table(name = "subjectnotices")
@Data
public class SubjectNoticeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String content;
    private String attachmentPath;
    private LocalDateTime createdAt;
    private String author;

    // 강의와 N:1 매핑
    @ManyToOne
    @JoinColumn(name = "lecture_id")
    private LectureEntity lectureEntity;
}
