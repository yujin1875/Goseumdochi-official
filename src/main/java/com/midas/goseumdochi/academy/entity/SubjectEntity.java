package com.midas.goseumdochi.academy.entity;

import com.midas.goseumdochi.academy.dto.SubjectDTO;
import com.midas.goseumdochi.director.entity.DirectorEntity;
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

    // 원장과 N:1 매핑
    @ManyToOne
    @JoinColumn(name = "director_id")
    private DirectorEntity directorEntity;

    // DTO -> Entity
    @Builder
    public SubjectEntity(Long id, String name, DirectorEntity directorEntity) {
        this.id = id;
        this.name = name;
        this.directorEntity = directorEntity;
    }

    public static SubjectEntity toSubjectEntity(SubjectDTO subjectDTO, DirectorEntity directorEntity) {
        SubjectEntity subjectEntity = SubjectEntity.builder()
                .id(subjectDTO.getId())
                .name(subjectDTO.getName())
                .directorEntity(directorEntity)
                .build();

        return subjectEntity;
    }
}
