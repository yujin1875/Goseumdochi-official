package com.midas.goseumdochi.teacher.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "video_lecture")
public class VideoLectureEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "teacher_id", nullable = false)
    private String teacherId;

    @Column(name = "lecture_id", nullable = false)
    private String lectureId;

    @Column(name = "video_url", nullable = false)
    private String videoUrl;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "file_name", nullable = false)
    private String fileName;

    public VideoLectureEntity() {}

    public VideoLectureEntity(String teacherId, String lectureId, String videoUrl, String title) {
        this.teacherId = teacherId;
        this.lectureId = lectureId;
        this.videoUrl = videoUrl;
        this.title = title;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(String teacherId) {
        this.teacherId = teacherId;
    }

    public String getLectureId() {
        return lectureId;
    }

    public void setLectureId(String lectureId) {
        this.lectureId = lectureId;
    }

    public String getVideoUrl() {
        return videoUrl;
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getFileName() { return fileName; }

    public void setFileName(String fileName) { this.fileName = fileName; }
}
