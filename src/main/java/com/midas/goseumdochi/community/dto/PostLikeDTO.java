package com.midas.goseumdochi.community.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PostLikeDTO {
    private Long id;
    private Long studentId;
    private Long postId;
}