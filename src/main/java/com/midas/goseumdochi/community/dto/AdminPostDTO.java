package com.midas.goseumdochi.community.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class AdminPostDTO {
    private Long id;
    private String title;
    private String content;
    private LocalDateTime createDate;
    private LocalDateTime modifyDate;
    private int views;
    private int likeCount;
    private String writerId;
}