package com.midas.goseumdochi.student.Repository;

import com.midas.goseumdochi.student.entity.StudentAnswerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface StudentAnswerRepository extends JpaRepository<StudentAnswerEntity, Long> {
    List<StudentAnswerEntity> findByStudentIdAndQuestionExamEntityId(Long studentId, Long examId);
}