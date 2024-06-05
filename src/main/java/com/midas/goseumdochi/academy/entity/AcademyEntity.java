package com.midas.goseumdochi.academy.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.midas.goseumdochi.director.entity.DirectorEntity;
import com.midas.goseumdochi.teacher.entity.TeacherEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "academy")
public class AcademyEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "academy_id")
    private Long id;

    @Column(name = "academy_name", length = 32)
    private String name;

    @Column(name = "academy_phoneno", length = 11)
    private String phoneNumber;

    @Column(name = "academy_postcode", length = 5)
    private String postcode;

    @Column(name = "academy_address", length = 64)
    private String address;

    @Column(name = "academy_detail", length = 64)
    private String addressDetail;

    // 원장과 1:1 양방향 매핑 (보조 엔터티 (읽기전용))
    @OneToOne(mappedBy = "academyEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private DirectorEntity directorEntity;

    // 선생과 1:N 매핑
    @OneToMany(mappedBy = "academyEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TeacherEntity> teacherEntityList;

    // 과목과 1:N 매핑
    @OneToMany(mappedBy = "academyEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SubjectEntity> subjectEntityList;

    @Builder
    public AcademyEntity(long id, String name, String phoneNumber, String postcode, String address, String addressDetail) {
        this.id = id;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.postcode = postcode;
        this.address = address;
        this.addressDetail = addressDetail;
    }
}
