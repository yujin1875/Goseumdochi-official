package com.midas.goseumdochi.teacher.repository;

import com.midas.goseumdochi.teacher.entity.ExamEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExamRepository extends JpaRepository<ExamEntity, Long> {

    // 강의 ID로 모든 시험을 찾는 메서드
    List<ExamEntity> findAllByLectureEntityId(Long lectureId);

    @Query("SELECT e FROM ExamEntity e WHERE e.lectureEntity.id IN :lectureIds")
    List<ExamEntity> findByLectureIds(@Param("lectureIds") List<Long> lectureIds);
}
