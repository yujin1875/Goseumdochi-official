package com.midas.goseumdochi.teacher.controller;

import com.midas.goseumdochi.teacher.entity.VideoLectureEntity;
import com.midas.goseumdochi.teacher.service.VideoUploadService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

@RestController
@RequestMapping("/api/video")
public class VideoUploadController {

    private final VideoUploadService videoUploadService;

    public VideoUploadController(VideoUploadService videoUploadService) {
        this.videoUploadService = videoUploadService;
    }

    @PostMapping("/videoUpload/{teacherId}/{lectureId}")
    public String uploadFile(@PathVariable("teacherId") String teacherId,
                             @PathVariable("lectureId") String lectureId,
                             @RequestParam("file") MultipartFile file,
                             @RequestParam("title") String title) throws Exception {

        Path tempFile = Files.createTempFile(file.getOriginalFilename(), "");
        file.transferTo(tempFile.toFile());

        String videoUrl = videoUploadService.uploadFile(tempFile, "goseumdochi_files", file.getOriginalFilename(), teacherId, lectureId);

        // db에 저장
        VideoLectureEntity lecture = new VideoLectureEntity();
        lecture.setTitle(title);
        lecture.setLectureId(lectureId);
        lecture.setVideoUrl(videoUrl);
        lecture.setTeacherId(teacherId);
        lecture.setFileName(file.getOriginalFilename()); // 파일 이름 저장

        videoUploadService.saveLecture(lecture);

        return videoUrl;
    }


    @GetMapping("/videoList/{teacherId}")
    public List<VideoLectureEntity> getVideoList(@PathVariable("teacherId") String teacherId) {
        return videoUploadService.getVideoList(teacherId);
    }
}
