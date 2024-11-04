package com.midas.goseumdochi.teacher.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class AssignmentDTO {
    private Long id;
    private String title;   // 제목
    private String content; // 내용
    private String author;  // 작성자

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createdAt;    // 공개일

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime deadline;     // 마감일

    private Integer points;   // 배점
    private String examType;  // 제출방식 "Online" 또는 "Offline"
    private String attachmentPath;  // 첨부파일
    private int submissionCount; // 제출 인원
    private Boolean isScoreVisible; // 점수 공개 여부

    private Long lectureId; // fk

    // lectureId 만 없는 생성자
    public AssignmentDTO(Long id, String title, String content, String author, LocalDateTime createdAt,
                         LocalDateTime deadline, Integer points, String examType, String attachmentPath,
                         int submissionCount, Boolean isScoreVisible, Long lectureId) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;
        this.createdAt = createdAt;
        this.deadline = deadline;
        this.points = points;
        this.examType = examType;
        this.attachmentPath = attachmentPath;
        this.submissionCount = submissionCount;
        this.isScoreVisible = isScoreVisible;
        this.lectureId = lectureId;
    }
}
