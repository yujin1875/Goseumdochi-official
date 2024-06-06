package com.midas.goseumdochi.teacher.repository;

import com.midas.goseumdochi.teacher.entity.LectureMaterialEntity;
import com.midas.goseumdochi.teacher.entity.SubjectNoticeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubjectNoticeRepository extends JpaRepository<SubjectNoticeEntity, Long> {
    @Query("SELECT n FROM SubjectNoticeEntity n WHERE n.lectureEntity.id = :lectureId")
    List<SubjectNoticeEntity> findAllByLectureId(@Param("lectureId") Long lectureId);


}
