package com.midas.goseumdochi.teacher.repository;

import com.midas.goseumdochi.teacher.entity.LectureMaterialEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LectureMaterialRepository extends JpaRepository<LectureMaterialEntity, Long> {
    @Query("SELECT m FROM LectureMaterialEntity m WHERE m.lectureEntity.id = :lectureId")
    List<LectureMaterialEntity> findAllByLectureId(@Param("lectureId") Long lectureId);

    // 강의자료 페이징 조회
    @Query("SELECT m FROM LectureMaterialEntity m WHERE m.lectureEntity.id = :lectureId")
    Page<LectureMaterialEntity> findAllByLectureId(@Param("lectureId") Long lectureId, Pageable pageable);
}
