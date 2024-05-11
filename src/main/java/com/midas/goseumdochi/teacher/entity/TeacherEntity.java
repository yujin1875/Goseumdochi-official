package com.midas.goseumdochi.teacher.entity;

import com.midas.goseumdochi.director.entity.DirectorEntity;
import com.midas.goseumdochi.teacher.dto.TeacherDTO;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Getter
//@Setter
//@DynamicInsert
@NoArgsConstructor // 기본 생성자
@Table(name = "teacher")
public class TeacherEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "teacher_id")
    private Long id;

    @Column(name = "teacher_name", length = 10)
    private String name;

    @Column(name = "teacher_loginid", length = 8)
    private String loginid;

    @Column(name = "teacher_pwd", length = 20)
    private String password;

    @Column(name = "teacher_phoneno", length = 13)
    private String phoneNumber;

    @Column(name = "director_birthdate")
    private LocalDate birthdate;

    @Column(name = "director_email", length = 32)
    private String email;

    // 원장과 N:1 매핑
    @ManyToOne
    @JoinColumn(name = "directer_id")
    private DirectorEntity directorEntity;
    // 빌더랑 toTeacherEntity 좀 수정 해야함

    @Builder
    public TeacherEntity(Long id, String name, String loginid, String password, String phoneNumber, LocalDate birthdate, String email) {
        this.id = id;
        this.name = name;
        this.loginid = loginid;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.birthdate = birthdate;
        this.email = email;
    }

    // TeacherDTO -> TeacherEntity
    public static TeacherEntity toTeacherEntity(TeacherDTO teacherDTO) {
        TeacherEntity teacherEntity = TeacherEntity.builder()
                .id(teacherDTO.getId())
                .name(teacherDTO.getName())
                .loginid(teacherDTO.getLoginid())
                .password(teacherDTO.getPassword())
                .birthdate(teacherDTO.getBirthdate())
                .email(teacherDTO.getEmail())
                .build();

        return teacherEntity;
    }
}
