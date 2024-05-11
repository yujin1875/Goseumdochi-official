package com.midas.goseumdochi.director.entity;

import com.midas.goseumdochi.student.entity.StudentEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "student_director")
public class StudentDirectorEntity { // Student와 director 관계 엔터티
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_director_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY) // FetchType.LAZY: 지연로딩 (조회 시점을 실제 해당 객체가 사용될때로 늦출 수 있음)
    @JoinColumn(name = "student_id")
    private StudentEntity studentEntity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "director_id")
    private DirectorEntity directorEntity;

    @Builder
    public StudentDirectorEntity(Long id, StudentEntity studentEntity, DirectorEntity directorEntity) {
        this.id = id;
        this.studentEntity = studentEntity;
        this.directorEntity = directorEntity;
    }
}
