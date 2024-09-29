package com.midas.goseumdochi.teacher.controller;

import com.midas.goseumdochi.teacher.service.VideoUploadService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;

@RestController
@RequestMapping("/api/video")
public class VideoUploadController {

    private final VideoUploadService videoUploadService;

    public VideoUploadController(VideoUploadService videoUploadService) {
        this.videoUploadService = videoUploadService;
    }

    @PostMapping("/videoUpload")
    public String uploadFile(@RequestParam("file") MultipartFile file) throws Exception {
        Path tempFile = Files.createTempFile(file.getOriginalFilename(), "");
        file.transferTo(tempFile.toFile());
        videoUploadService.uploadFile(tempFile, "goseumdochi_files", file.getOriginalFilename());
        return "File uploaded successfully";
    }
}
