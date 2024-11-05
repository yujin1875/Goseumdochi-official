package com.midas.goseumdochi.util.ai;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/video")
public class VideoCaptionController {

    @Autowired
    private VideoCaptionService videoCaptionService;

    // 자막 생성을 요청하는 엔드포인트
    @PostMapping("/generateCaption")
    public ResponseEntity<VideoCaptionDTO> generateCaption(@RequestBody Map<String, String> body) {
        String videoUrl = body.get("video_url");
        VideoCaptionDTO videoCaptionDTO = videoCaptionService.generateCaption(videoUrl);
        return ResponseEntity.ok(videoCaptionDTO);
    }

}
