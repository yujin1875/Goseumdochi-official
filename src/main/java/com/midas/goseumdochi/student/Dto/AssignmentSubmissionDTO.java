package com.midas.goseumdochi.student.Dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AssignmentSubmissionDTO {
    private Long id;
    private Long studentId;       // 학생 ID
    private Long assignmentId;    // 과제 ID
    private String title;         // 과제 제목
    private String content;       // 과제 내용
    private String attachmentPath;// 첨부 파일 경로
    private String submissionStatus; // "정상제출" 또는 "미제출"
}
