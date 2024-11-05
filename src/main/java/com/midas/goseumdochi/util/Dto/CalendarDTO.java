package com.midas.goseumdochi.util.Dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CalendarDTO {
    private String title;
    private String eventType; // "assignment" 또는 "exam"
    private LocalDateTime date; // 날짜 필드

    public CalendarDTO(String title, String eventType, LocalDateTime date) {
        this.title = title;
        this.eventType = eventType;
        this.date = date;
    }
}

