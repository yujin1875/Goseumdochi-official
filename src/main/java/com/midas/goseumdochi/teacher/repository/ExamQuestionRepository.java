package com.midas.goseumdochi.teacher.repository;

import com.midas.goseumdochi.teacher.entity.ExamQuestionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExamQuestionRepository extends JpaRepository<ExamQuestionEntity, Long> {
    List<ExamQuestionEntity> findAllByExamEntityId(Long examId);
    Optional<ExamQuestionEntity> findByIdAndExamEntityId(Long questionId, Long examId);

    List<ExamQuestionEntity> findByExamEntityId(Long examId);
}
