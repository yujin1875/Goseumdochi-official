package com.midas.goseumdochi.teacher.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

@Data
public class SubjectNoticeDTO {
    private Long id;
    private String title;
    private String content;
    private String attachmentPath;
    private LocalDateTime createdAt;
    private String author;

    private Long lectureId; // fk

    // lectureId 만 없는 생성자
    public SubjectNoticeDTO(Long id, String title, String content, LocalDateTime createdAt, String attachmentPath, String author, Long lectureId) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
        this.attachmentPath = attachmentPath;
        this.author = author;
        this.lectureId = lectureId;
    }

    public String getCreatedAt() {
        // 한국 시간대로 변환하여 ISO 8601 형식으로 반환
        return createdAt.atZone(ZoneId.of("Asia/Seoul"))
                .format(DateTimeFormatter.ISO_OFFSET_DATE_TIME);
    }

}
