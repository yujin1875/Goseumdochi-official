package com.midas.goseumdochi.community.entity;

import com.midas.goseumdochi.admin.entity.AdminEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "post_admin")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminPostEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(nullable = false)
    private LocalDateTime createDate;

    @Column
    private LocalDateTime modifyDate;

    @Column(nullable = false)
    private int views;

    @Column(nullable = false)
    private int likeCount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "writer_id", nullable = false)
    private AdminEntity writer;

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

    // 게시글 수정 날짜를 현재시간으로 업뎃하는 함수
    public void updateModifyDate() {
        this.modifyDate = LocalDateTime.now();
    }
}
