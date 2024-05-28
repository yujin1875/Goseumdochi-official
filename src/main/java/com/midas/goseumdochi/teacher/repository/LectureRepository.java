package com.midas.goseumdochi.teacher.repository;

import com.midas.goseumdochi.teacher.entity.LectureEntity;
import com.midas.goseumdochi.teacher.entity.TeacherEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LectureRepository extends JpaRepository<LectureEntity, Long> {
    //fk로 찾기
    @Query("SELECT l FROM LectureEntity l WHERE l.teacherEntity.id = :teacherId")
    List<LectureEntity> findAllByTeacherId(@Param("teacherId") Long teacherId);
}
