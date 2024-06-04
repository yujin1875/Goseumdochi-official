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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "writer_id", nullable = false)
    private StudentEntity writer;
    
    // 학원이랑 연결
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "academy_id", nullable = false)
    private AcademyEntity academy_id;

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
}

