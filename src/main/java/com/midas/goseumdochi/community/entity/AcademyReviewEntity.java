package com.midas.goseumdochi.community.entity;

import com.midas.goseumdochi.academy.entity.AcademyEntity;
import com.midas.goseumdochi.student.entity.StudentEntity;
import jakarta.persistence.*;

import java.time.LocalDateTime;

// 학원 리뷰 게시판
@Entity
@Table(name = "post_academyReview")
public class AcademyReviewEntity {
    // 리뷰 수정 불가능 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(nullable = false)
    private LocalDateTime createDate;

    @Column(nullable = false, columnDefinition = "integer default 0")
    private int views;

    @Column(nullable = false, columnDefinition = "integer default 0")
    private int likeCount;

    @Column(nullable = false)
    private int star; // ㅇ별점

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "writer_id", nullable = false)
    private StudentEntity writer;

    // 학원이랑 연결
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "academy_id", nullable = false)
    private AcademyEntity academy;

    @PrePersist
    protected void onCreateDate() {
        this.createDate = LocalDateTime.now();
    }

    // 조회수 1 증가시키는 함수
    public void incrementViews() {
        this.views++;
    }

    // 좋아요 1 증가시키는 함수
    public void incrementLikes() {
        this.likeCount++;
    }

    // Getters and Setters
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

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getCreateDate() {
        return createDate;
    }

    public void setCreateDate(LocalDateTime createDate) {
        this.createDate = createDate;
    }

    public int getViews() {
        return views;
    }

    public void setViews(int views) {
        this.views = views;
    }

    public int getLikeCount() {
        return likeCount;
    }

    public void setLikeCount(int likeCount) {
        this.likeCount = likeCount;
    }

    public int getStar() {
        return star;
    }

    public void setStar(int star) {
        this.star = star;
    }

    public StudentEntity getWriter() {
        return writer;
    }

    public void setWriter(StudentEntity writer) {
        this.writer = writer;
    }

    public AcademyEntity getAcademy() {
        return academy;
    }

    public void setAcademy(AcademyEntity academy) {
        this.academy = academy;
    }
}
