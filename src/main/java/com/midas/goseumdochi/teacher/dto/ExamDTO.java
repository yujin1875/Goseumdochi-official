package com.midas.goseumdochi.teacher.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExamDTO {
    private Long id;
    private String title;
    private String examMethod;
    private LocalDateTime openDate;
    private LocalDateTime examPeriodStart;
    private LocalDateTime examPeriodEnd;
    private int duration;
    private boolean scorePublished;
    private LocalDateTime scorePublishDate;
    private int points;
    private boolean isOngoing;
    private int submissionCount;
    private double evaluationScore;
    private Long lectureId;
}
