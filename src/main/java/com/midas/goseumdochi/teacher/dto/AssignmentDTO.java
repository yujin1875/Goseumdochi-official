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
    private String title;
    private String content;
    private String author;
    private LocalDateTime createdAt;
    private LocalDateTime deadline;
    private Integer points;
    private String examType;  // "Online" 또는 "Offline"
    private String attachmentPath;
}
