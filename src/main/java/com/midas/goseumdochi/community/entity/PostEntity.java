package com.midas.goseumdochi.community.entity;

import com.midas.goseumdochi.academy.entity.AcademyEntity;
import com.midas.goseumdochi.student.entity.StudentEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "post")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(nullable = false)
    private LocalDateTime createDate;

    @Column(nullable = false)
    private LocalDateTime updateDate;

    @Column(nullable = false, columnDefinition = "integer default 0")
    private int views;

    @Column(nullable = false, columnDefinition = "integer default 0")
    private int likeCount;

    @Column(nullable = false)
    private int star;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "academy_id")
    private AcademyEntity academy;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "writer_id", nullable = false)
    private StudentEntity writer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private CategoryEntity category;

    @Column(nullable = false, columnDefinition = "boolean default false")
    private boolean isModified;

    @PrePersist
    protected void onCreate() {
        LocalDateTime now = LocalDateTime.now();
        this.createDate = now;
        this.updateDate = now;
    }

    @PreUpdate
    protected void onUpdate() {
        this.updateDate = LocalDateTime.now();
    }

    // 조회수 1 증가시키는 함수
    public void incrementViews() {
        this.views++;
    }

    // 좋아요 1 증가시키는 함수
    public void incrementLikes() {
        this.likeCount++;
    }

    // 좋아요 1 감소시키는 함수
    public void decrementLikes() {
        if (this.likeCount > 0) {
            this.likeCount--;
        }
    }

    // 게시글 수정 여부 설정 함수
    public void setModified(boolean isModified) {
        this.isModified = isModified;
    }

    // CategoryEntity를 설정하는 메서드 추가
    public void setCategory(CategoryEntity category) {
        this.category = category;
    }
}