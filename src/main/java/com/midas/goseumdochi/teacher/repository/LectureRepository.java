package com.midas.goseumdochi.teacher.repository;

import com.midas.goseumdochi.teacher.entity.LectureEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LectureRepository extends JpaRepository<LectureEntity, Long> {
}
