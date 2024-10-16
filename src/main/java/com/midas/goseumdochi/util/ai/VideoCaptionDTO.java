package com.midas.goseumdochi.util.ai;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class VideoCaptionDTO {

    @JsonIgnore
    private String caption; // 자막 텍스트
    private String processedVideoPath; // 처리된 동영상 경로
}
