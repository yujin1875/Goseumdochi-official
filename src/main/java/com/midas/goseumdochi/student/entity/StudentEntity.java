package com.midas.goseumdochi.student.entity;
import com.midas.goseumdochi.student.Dto.StudentDTO;
import jakarta.persistence.*;
import lombok.Data;


@Entity
@Table(name = "students")
@Data
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
    private String profilePictureUrl;

    public static StudentEntity toStudent(StudentDTO studentDTO){
        StudentEntity studentEntity = new StudentEntity();
        studentEntity.setStudentId(studentDTO.getStudentId());
        studentEntity.setStudentPassword(studentDTO.getStudentPassword());
        studentEntity.setStudentName(studentDTO.getStudentName());
        return studentEntity;
    }
}
