package com.midas.goseumdochi.student.Repository;

import com.midas.goseumdochi.student.entity.RegistLectureEntity;
import com.midas.goseumdochi.student.entity.StudentEntity;
import com.midas.goseumdochi.teacher.entity.LectureEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RegistLectureRepository extends JpaRepository<RegistLectureEntity, Long> {
    @Query("SELECT r.studentEntity FROM RegistLectureEntity r WHERE r.lectureEntity.id = :lectureId")
    List<StudentEntity> findAllStudentByLectureId(@Param("lectureId") Long lectureId);

    @Query("SELECT r.lectureEntity FROM RegistLectureEntity r WHERE r.studentEntity.id = :studentId")
    List<LectureEntity> findAllLectureByStudentId(@Param("studentId") Long studentId);

    @Query("SELECT r FROM RegistLectureEntity r WHERE r.lectureEntity.id = :lectureId And r.studentEntity.id = :studentId")
    Optional<RegistLectureEntity> findByLectureIdAndStudentId(@Param("lectureId") Long lectureId, @Param("studentId") Long studentId);

    @Query("SELECT r.lectureEntity.id FROM RegistLectureEntity r WHERE r.studentEntity.id = :studentId")
    List<Long> findLectureIdsByStudentId(@Param("studentId") Long studentId);

}
