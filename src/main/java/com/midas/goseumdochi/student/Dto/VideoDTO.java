package com.midas.goseumdochi.student.Dto;

public class VideoDTO {
    private Long id;
    private String title;
    private String videoUrl;

    // 생성자, 게터 및 세터 추가
    public VideoDTO(Long id, String title, String videoUrl) {
        this.id = id;
        this.title = title;
        this.videoUrl = videoUrl;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getVideoUrl() {
        return videoUrl;
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }
}
