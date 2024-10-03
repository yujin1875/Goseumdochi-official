package com.midas.goseumdochi.teacher.service;

import com.midas.goseumdochi.teacher.entity.VideoLectureEntity;
import com.midas.goseumdochi.teacher.repository.VideoLectureRepository; // 리포지토리 임포트 추가
import com.google.cloud.storage.*;
import org.springframework.stereotype.Service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

@Service
public class VideoUploadService {

    private final Storage storage = StorageOptions.getDefaultInstance().getService();
    private final VideoLectureRepository videoLectureRepository; // 리포지토리 추가

    public VideoUploadService(VideoLectureRepository videoLectureRepository) {
        this.videoLectureRepository = videoLectureRepository;
    }

    // lectureId를 추가 인자로 받습니다.
    public String uploadFile(Path filePath, String bucketName, String blobName, String teacherId, String lectureId) throws Exception {
        String fullPath = "video/" + teacherId + "/" + lectureId + "/" + blobName; // 경로 수정
        BlobInfo blobInfo = BlobInfo.newBuilder(bucketName, fullPath).build();
        storage.create(blobInfo, Files.readAllBytes(filePath));

        return String.format("https://storage.googleapis.com/%s/%s", bucketName, fullPath);
    }

    public void saveLecture(VideoLectureEntity lecture) {
        videoLectureRepository.save(lecture); // 데이터베이스에 강의 정보 저장
    }

    public List<VideoLectureEntity> getVideoList(String teacherId) {
        return videoLectureRepository.findByTeacherId(teacherId); // 선생님 ID로 강의 목록 조회
    }
}
