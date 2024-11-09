package com.midas.goseumdochi.student.Repository;

import com.midas.goseumdochi.student.entity.StudentAnswerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.util.List;
import java.util.Optional;

@Repository
public interface StudentAnswerRepository extends JpaRepository<StudentAnswerEntity, Long> {
    List<StudentAnswerEntity> findByStudentIdAndQuestionExamEntityId(Long studentId, Long examId);

    @Query("SELECT sa FROM StudentAnswerEntity sa WHERE sa.studentId = :studentId AND sa.question.examEntity.id = :examId")
    List<StudentAnswerEntity> findByStudentIdAndExamId(@Param("studentId") Long studentId, @Param("examId") Long examId);

}