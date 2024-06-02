package com.midas.goseumdochi.student.entity;

import com.midas.goseumdochi.academy.entity.StudentAcademyEntity;
import com.midas.goseumdochi.community.entity.PostEntity;
import com.midas.goseumdochi.student.Dto.StudentDTO;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;

@Entity
@Table(name = "students")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String studentId;

    @Column
    private String studentPassword;

    @Column
    private String studentName;

    @Column
    private String studentBirthDate;

    @Column
    private String studentPhoneNumber;

    @Column
    private String studentEmail;

    @Column
    private String profilePictureUrl;

    // 학원과 매핑
    @OneToMany(mappedBy = "studentEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StudentAcademyEntity> studentAcademyEntityList;

    // 강의와 매핑
    @OneToMany(mappedBy = "studentEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RegistLectureEntity> registLectureEntityList;

    public static StudentEntity toStudent(StudentDTO studentDTO) {
        return StudentEntity.builder()
                .studentId(studentDTO.getStudentId())
                .studentPassword(studentDTO.getStudentPassword())
                .studentName(studentDTO.getStudentName())
                .studentBirthDate(studentDTO.getStudentBirthDate())
                .studentPhoneNumber(studentDTO.getStudentPhoneNumber())
                .studentEmail(studentDTO.getStudentEmail())
                .profilePictureUrl(studentDTO.getProfilePictureUrl())
                .build();
    }

    // 좋아요한 글 목록
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "liked_posts",
            joinColumns = @JoinColumn(name = "student_id"),
            inverseJoinColumns = @JoinColumn(name = "post_id"))
    private List<PostEntity> likedPosts;

    // 좋아요한 글 목록 조회 메서드
    public List<PostEntity> getLikedPosts() {
        return likedPosts;
    }
}
