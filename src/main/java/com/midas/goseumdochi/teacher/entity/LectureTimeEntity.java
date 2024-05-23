package com.midas.goseumdochi.teacher.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "lecture_time")
public class LectureTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "lecture_time_id")
    private Long id;

    @Column(name = "lecture_time_day")
    private String day;

    @Column(name = "lecture_time_startime")
    private LocalTime startTime;

    @Column(name = "lecture_time_endtime")
    private LocalTime endTime;

    @ManyToOne
    @JoinColumn(name = "lecture_id")
    private LectureEntity lectureEntity;

    @Builder
    public LectureTimeEntity(Long id, String day, LocalTime startTime, LocalTime endTime, LectureEntity lectureEntity) {
        this.id = id;
        this.day = day;
        this.startTime = startTime;
        this.endTime = endTime;
        this.lectureEntity = lectureEntity;
    }
}
