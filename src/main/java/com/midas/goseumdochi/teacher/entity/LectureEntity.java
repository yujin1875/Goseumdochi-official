package com.midas.goseumdochi.teacher.entity;

import com.midas.goseumdochi.academy.entity.SubjectEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "lecture")
public class LectureEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "lecture_id")
    private Long id;

    @Column(name = "lecture_name", length = 32)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teacher_id")
    private TeacherEntity teacherEntity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id")
    private SubjectEntity subjectEntity;

    @OneToMany(mappedBy = "lectureEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LectureTimeEntity> lectureTimeEntityList;

    @Builder
    public LectureEntity(Long id, String name, TeacherEntity teacherEntity, SubjectEntity subjectEntity) {
        this.id = id;
        this.name = name;
        this.teacherEntity = teacherEntity;
        this.subjectEntity = subjectEntity;
    }
}
