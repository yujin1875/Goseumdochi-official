package com.midas.goseumdochi.community.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class CommentDTO {
    private Long id;
    private String text;
    private LocalDateTime createDate;
    private Long writerId;
    private Long postId;
}
