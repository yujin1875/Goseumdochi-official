package com.midas.goseumdochi.teacher.repository;

import com.midas.goseumdochi.teacher.entity.ExamEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExamRepository extends JpaRepository<ExamEntity, Long> {

    List<ExamEntity> findAllByLectureEntityId(Long lectureId);
}
