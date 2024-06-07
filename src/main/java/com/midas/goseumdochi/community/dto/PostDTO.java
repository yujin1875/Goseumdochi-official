package com.midas.goseumdochi.community.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class PostDTO {
    private Long id;
    private String title;
    private String content;
    private LocalDateTime createDate;
    private int views;
    private int likeCount;
    private Long writerId;
    private Long categoryId;
    private boolean isModified;
    private List<CommentDTO> comments;
}
