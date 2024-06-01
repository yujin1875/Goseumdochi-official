package com.midas.goseumdochi.teacher.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class SubjectNoticeDTO {
    private Long id;
    private String title;
    private String content;
    private String attachmentPath;
    private LocalDateTime createdAt;
}
