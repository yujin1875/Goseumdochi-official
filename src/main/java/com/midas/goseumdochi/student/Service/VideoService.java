package com.midas.goseumdochi.student.Service;

import com.midas.goseumdochi.student.Dto.VideoDTO;
import com.midas.goseumdochi.student.Repository.VideoRepository;
import com.midas.goseumdochi.teacher.entity.VideoLectureEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class VideoService {

    private final VideoRepository videoRepository;

    public VideoService(VideoRepository videoRepository) {
        this.videoRepository = videoRepository;
    }

    public List<VideoDTO> getVideoList(String lectureId) {
        List<VideoLectureEntity> videoEntities = videoRepository.findByLectureId(lectureId);

        // VideoLectureEntity -> VideoDTO 변환
        return videoEntities.stream()
                .map(video -> new VideoDTO(video.getId(), video.getTitle(), video.getVideoUrl())) // 필요한 필드만 추출
                .collect(Collectors.toList());
    }
}


