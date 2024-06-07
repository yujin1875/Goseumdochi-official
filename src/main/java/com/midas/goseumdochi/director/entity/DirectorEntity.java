package com.midas.goseumdochi.director.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.midas.goseumdochi.academy.entity.AcademyEntity;
import com.midas.goseumdochi.director.dto.DirectorDTO;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "director")
public class DirectorEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "director_id")
    private Long id;

    @Column(name = "director_name", length = 10)
    private String name;

    @Column(name = "director_loginid", length = 8)
    private String loginid;

    @Column(name = "director_pwd")
    private String password;

    @Column(name = "director_phoneno", length = 11)
    private String phoneNumber;

    @Column(name = "director_birthdate")
    private LocalDate birthdate;

    @Column(name = "director_email", length = 32)
    private String email;

    // 학원과 1:1 양방향 매핑(주 엔터티)
    @OneToOne
    @JoinColumn(name = "academy_id")
    @JsonBackReference
    private AcademyEntity academyEntity;

    // 원장 공사항과 1:N 연경
    @OneToMany(mappedBy = "directorEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DirectorNoticeEntity> directorNoticeEntityList;

    @Builder
    public DirectorEntity(Long id, String name, String loginid, String password, String phoneNumber, LocalDate birthdate, String email, AcademyEntity academyEntity) {
        this.id = id;
        this.name = name;
        this.loginid = loginid;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.birthdate = birthdate;
        this.email = email;
        this.academyEntity = academyEntity;
    }

    // directorDTO -> directorEntity
    public static DirectorEntity toDirectorEntity(DirectorDTO directorDTO) {
        return DirectorEntity.builder()
                .id(directorDTO.getId())
                .name(directorDTO.getName())
                .loginid(directorDTO.getLoginid())
                .password(directorDTO.getPassword())
                .phoneNumber(directorDTO.getPhoneNumber())
                .birthdate(directorDTO.getBirthdate())
                .email(directorDTO.getEmail())
                .build();
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAcademyEntity(AcademyEntity academy) {
        this.academyEntity = academy;
    }
}
