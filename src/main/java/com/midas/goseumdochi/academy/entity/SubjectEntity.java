package com.midas.goseumdochi.academy.entity;

import com.midas.goseumdochi.academy.dto.SubjectDTO;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "subject")
public class SubjectEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "subject_id")
    private Long id;

    @Column(name = "subject_name")
    private String name;

    // 학원과 N:1 매핑
    @ManyToOne
    @JoinColumn(name = "academy_id")
    private AcademyEntity academyEntity;

    // 선생-강의와 양방향 연결을 위한다면 매핑 추가하기

    // DTO -> Entity
    @Builder
    public SubjectEntity(Long id, String name, AcademyEntity academyEntity) {
        this.id = id;
        this.name = name;
        this.academyEntity = academyEntity;
    }

    public static SubjectEntity toSubjectEntity(SubjectDTO subjectDTO, AcademyEntity academyEntity) {
        SubjectEntity subjectEntity = SubjectEntity.builder()
                .id(subjectDTO.getId())
                .name(subjectDTO.getName())
                .academyEntity(academyEntity)
                .build();

        return subjectEntity;
    }
}
