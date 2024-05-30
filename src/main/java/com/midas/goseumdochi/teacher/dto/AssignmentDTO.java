package com.midas.goseumdochi.teacher.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AssignmentDTO {
    private Long id;
    private String title;   // 제목
    private String content; // 내용
    private String author;  // 작성자
    private LocalDateTime createdAt;    // 공개일
    private LocalDateTime deadline;     // 마감일
    private Integer points;   // 배점
    private String examType;  // 제출방식 "Online" 또는 "Offline"
    private String attachmentPath;  // 첨부파일
}
