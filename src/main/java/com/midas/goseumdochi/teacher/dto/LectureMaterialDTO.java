package com.midas.goseumdochi.teacher.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class LectureMaterialDTO {
    private Long id;
    private String title;   // 제목
    private String content; // 내용
    private String author;  // 글쓴이
    private LocalDateTime createdAt;    // 생성일시
    private String attachmentPath;  // 첨부파일 경로

    private Long lectureId; // fk

    // lectureId 만 없는 생성자
    public LectureMaterialDTO(Long id, String title, String content, String author, LocalDateTime createdAt, String attachmentPath) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;
        this.createdAt = createdAt;
        this.attachmentPath = attachmentPath;
    }
}