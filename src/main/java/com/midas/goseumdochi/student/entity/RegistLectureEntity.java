package com.midas.goseumdochi.student.entity;

import com.midas.goseumdochi.teacher.entity.LectureEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "regist_lecture")
public class RegistLectureEntity { // 수강 엔터티
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "regist_lecture_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id")
    StudentEntity studentEntity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lecture_id")
    LectureEntity lectureEntity;

    @Builder
    public RegistLectureEntity(Long id, StudentEntity studentEntity, LectureEntity lectureEntity) {
        this.id = id;
        this.studentEntity = studentEntity;
        this.lectureEntity = lectureEntity;
    }
}
