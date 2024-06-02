package com.midas.goseumdochi.teacher.repository;

import com.midas.goseumdochi.teacher.entity.AssignmentEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AssignmentRepository extends JpaRepository<AssignmentEntity, Long> {
    // 과제 페이징 조회
    @Query("SELECT m FROM AssignmentEntity m WHERE m.lectureEntity.id = :lectureId")
    Page<AssignmentEntity> findAllByLectureId(@Param("lectureId") Long lectureId, Pageable pageable);
}
