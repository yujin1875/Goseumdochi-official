package com.midas.goseumdochi.student.Controller;

import com.midas.goseumdochi.student.Dto.VideoDTO;
import com.midas.goseumdochi.student.Service.VideoService;
import com.midas.goseumdochi.teacher.entity.VideoLectureEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/video")
public class VideoController {
    private final VideoService videoService;

    public VideoController(VideoService videoService) {
        this.videoService = videoService;
    }

    @GetMapping("/student/videoList/{lectureId}")
    public List<VideoDTO> getVideoList(@PathVariable("lectureId") String lectureId) {
        return videoService.getVideoList(lectureId);
    }
}
