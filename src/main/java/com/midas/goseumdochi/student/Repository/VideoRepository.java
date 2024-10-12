package com.midas.goseumdochi.student.Repository;

import com.midas.goseumdochi.teacher.entity.VideoLectureEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VideoRepository extends JpaRepository<VideoLectureEntity, Long>{
    List<VideoLectureEntity> findByLectureId(String lectureId);
}