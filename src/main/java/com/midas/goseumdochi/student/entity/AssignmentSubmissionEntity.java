package com.midas.goseumdochi.student.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "assignment_submission")
public class AssignmentSubmissionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long studentId;

    @Column(nullable = false)
    private Long assignmentId;

    private String title;

    @Column(length = 1000)
    private String content;

    private String attachmentPath; // 첨부 파일 경로

    @Builder.Default
    @Column(nullable = false)
    private String submissionStatus = "미제출"; // 기본값 설정
}
