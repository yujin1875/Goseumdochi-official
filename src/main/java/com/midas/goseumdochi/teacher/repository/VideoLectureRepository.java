package com.midas.goseumdochi.teacher.repository;

import com.midas.goseumdochi.teacher.entity.VideoLectureEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VideoLectureRepository extends JpaRepository<VideoLectureEntity, Long> {

    // 선생님 ID로 강의 목록 조회
    List<VideoLectureEntity> findByTeacherId(String teacherId);
}
