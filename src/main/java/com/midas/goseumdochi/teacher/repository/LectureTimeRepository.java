package com.midas.goseumdochi.teacher.repository;

import com.midas.goseumdochi.teacher.entity.LectureTimeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LectureTimeRepository extends JpaRepository<LectureTimeEntity, Long> {
}
