package com.midas.goseumdochi.teacher.entity;

import com.midas.goseumdochi.academy.entity.SubjectEntity;
import com.midas.goseumdochi.teacher.dto.LectureDTO;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "lecture")
public class LectureEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "lecture_id")
    private Long id;

    @Column(name = "lecture_name", length = 32)
    private String name;

    @Column(name = "lecture_max_count")
    private int maxCount; // 최대 인원수

    @Column(name = "lecture_head_count")
    @ColumnDefault("0")
    private int headCount; // 현재 인원수

    @Column(name = "lecture_location")
    private String lectureLocation;

    @Column(name = "lecture_details")
    private String lectureDetails;

    @Column(name = "lecture_weekly_plan")
    private String lectureWeeklyPlan;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teacher_id")
    private TeacherEntity teacherEntity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id")
    private SubjectEntity subjectEntity;

    @OneToMany(mappedBy = "lectureEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LectureTimeEntity> lectureTimeEntityList;

    @OneToMany(mappedBy = "lectureEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LectureMaterialEntity> lectureMaterialEntityList;

    @OneToMany(mappedBy = "lectureEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AssignmentEntity> assignmentEntityList;

    @Builder
    public LectureEntity(Long id, String name, int maxCount, int headCount, String lectureLocation, String lectureDetails,
                         String lectureWeeklyPlan, TeacherEntity teacherEntity, SubjectEntity subjectEntity) {
        this.id = id;
        this.name = name;
        this.maxCount = maxCount;
        this.headCount = headCount;
        this.teacherEntity = teacherEntity;
        this.subjectEntity = subjectEntity;
        this.lectureLocation = lectureLocation;
        this.lectureDetails = lectureDetails;
        this.lectureWeeklyPlan = lectureWeeklyPlan;
    }

    public static LectureEntity toLectureEntity(LectureDTO lectureDTO, TeacherEntity teacherEntity, SubjectEntity subjectEntity) {
        LectureEntity lectureEntity = LectureEntity.builder()
                .id(lectureDTO.getId())
                .name(lectureDTO.getName())
                .maxCount(lectureDTO.getMaxCount())
                .headCount(lectureDTO.getHeadCount())
                .teacherEntity(teacherEntity)
                .subjectEntity(subjectEntity)
                .lectureLocation(lectureDTO.getLectureLocation())
                .lectureDetails(lectureDTO.getLectureDetails())
                .lectureWeeklyPlan(lectureDTO.getLectureWeeklyPlan())
                .build();

        return lectureEntity;
    }
}
