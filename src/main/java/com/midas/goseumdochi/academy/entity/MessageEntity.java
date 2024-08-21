package com.midas.goseumdochi.academy.entity;

import com.midas.goseumdochi.student.entity.StudentEntity;
import com.midas.goseumdochi.teacher.entity.TeacherEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "message")
public class MessageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_id")
    private Long id;

    @Column(name = "message_title", length = 50)
    private String title;

    @Column(name = "message_content", length = 300)
    private String content;

//    @CreationTimestamp // 현재시간 저장됨
    @CreatedDate // 최초 생성된 날짜 저장
    @Column(name = "message_send_date")
    private LocalDate sendDate;

    @Column(name = "message_sender", length = 1)
    private String sender; // T(선생), S(학생)

    @Column(name = "message_view_state", length = 1)
    @ColumnDefault("'N'")
    private String viewState; // N(열람x), Y(열람o)

    @Column(name = "message_delete_by_student", length = 1)
    @ColumnDefault("'N'")
    private String deleteByStudent; // N(삭제x), Y(삭제o)

    @Column(name = "message_delete_by_teacher", length = 1)
    @ColumnDefault("'N'")
    private String deleteByTeacher;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id")
    private StudentEntity studentEntity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teacher_id")
    private TeacherEntity teacherEntity;

    @Builder
    public MessageEntity(Long id, String title, String content, LocalDate sendDate, String sender, String viewState,
                         String deleteByStudent, String deleteByTeacher, StudentEntity studentEntity, TeacherEntity teacherEntity) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.sender = sender;
        this.sendDate = sendDate;
        this.viewState = viewState;
        this.deleteByStudent = deleteByStudent;
        this.deleteByTeacher = deleteByTeacher;
        this.studentEntity = studentEntity;
        this.teacherEntity = teacherEntity;
    }

    // 학생과 선생 모두 삭제했으면 메시지를 DB에서 삭제하기 위해
    public Boolean isDelete() {
        return this.deleteByStudent.equals('Y') && this.deleteByTeacher.equals('Y');
    }
}
