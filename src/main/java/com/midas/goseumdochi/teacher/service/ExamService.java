package com.midas.goseumdochi.teacher.service;

import com.midas.goseumdochi.teacher.dto.ExamDTO;
import com.midas.goseumdochi.teacher.dto.ExamQuestionDTO;
import com.midas.goseumdochi.teacher.entity.ExamEntity;
import com.midas.goseumdochi.teacher.repository.ExamRepository;
import com.midas.goseumdochi.teacher.repository.LectureRepository;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExamService {
    private final ExamRepository examRepository;
    private final LectureRepository lectureRepository;

    public void saveExam(ExamDTO examDTO) {
        ExamEntity entity = new ExamEntity();
        entity.setTitle(examDTO.getTitle());
        entity.setExamMethod(examDTO.getExamMethod());
        entity.setOpenDate(examDTO.getOpenDate());
        entity.setExamPeriodStart(examDTO.getExamPeriodStart());
        entity.setExamPeriodEnd(examDTO.getExamPeriodEnd());
        entity.setDuration(examDTO.getDuration());
        entity.setScorePublished(examDTO.isScorePublished());
        entity.setPoints(examDTO.getPoints());
        entity.setSubmissionCount(examDTO.getSubmissionCount());
        entity.setEvaluationScore(examDTO.getEvaluationScore());
        entity.setLectureEntity(lectureRepository.findById(examDTO.getLectureId())
                .orElseThrow(() -> new RuntimeException("강의가 존재하지 않습니다.")));
        examRepository.save(entity);
    }

    @Transactional(readOnly = true) // 트랜잭션 범위 내에서 Lazy Loading 해결
    public List<ExamDTO> getExamsByLectureId(Long lectureId) {
        return examRepository.findAllByLectureEntityId(lectureId).stream()
                .map(entity -> new ExamDTO(
                        entity.getId(),
                        entity.getTitle(),
                        entity.getExamMethod(),
                        entity.getOpenDate(),
                        entity.getExamPeriodStart(),
                        entity.getExamPeriodEnd(),
                        entity.getDuration(),
                        entity.isScorePublished(),
                        entity.getPoints(),
                        entity.getSubmissionCount(),
                        entity.getEvaluationScore(),
                        entity.getLectureEntity() != null ? entity.getLectureEntity().getId() : null, // null 체크 추가
                        entity.getQuestions() != null ? entity.getQuestions().stream()
                                .map(q -> new ExamQuestionDTO(
                                        q.getId(),
                                        q.getType(),
                                        q.getText(),
                                        q.getPoints(),
                                        q.getAnswers(),
                                        q.getCorrectAnswer(),
                                        q.getExamEntity().getId()
                                ))
                                .collect(Collectors.toList()) : null
                ))
                .collect(Collectors.toList());
    }


    public ExamDTO getExamById(Long id) {
        ExamEntity entity = examRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("시험이 존재하지 않습니다."));
        return new ExamDTO(
                entity.getId(),
                entity.getTitle(),
                entity.getExamMethod(),
                entity.getOpenDate(),
                entity.getExamPeriodStart(),
                entity.getExamPeriodEnd(),
                entity.getDuration(),
                entity.isScorePublished(),
                entity.getPoints(),
                entity.getSubmissionCount(),
                entity.getEvaluationScore(),
                entity.getLectureEntity().getId(),
                entity.getQuestions() != null ? entity.getQuestions().stream()
                        .map(q -> new ExamQuestionDTO(
                                q.getId(),
                                q.getType(),
                                q.getText(),
                                q.getPoints(),
                                q.getAnswers(),
                                q.getCorrectAnswer(),
                                q.getExamEntity().getId()
                        ))
                        .collect(Collectors.toList()) : null
        );
    }

    public void updateExam(Long id, ExamDTO examDTO) {
        ExamEntity entity = examRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("시험이 존재하지 않습니다."));
        entity.setTitle(examDTO.getTitle());
        entity.setExamMethod(examDTO.getExamMethod());
        entity.setOpenDate(examDTO.getOpenDate());
        entity.setExamPeriodStart(examDTO.getExamPeriodStart());
        entity.setExamPeriodEnd(examDTO.getExamPeriodEnd());
        entity.setDuration(examDTO.getDuration());
        entity.setScorePublished(examDTO.isScorePublished());
        entity.setPoints(examDTO.getPoints());
        entity.setSubmissionCount(examDTO.getSubmissionCount());
        entity.setEvaluationScore(examDTO.getEvaluationScore());
        examRepository.save(entity);
    }

    public void deleteExam(Long id) {

        if (!examRepository.existsById(id)) {
            throw new IllegalArgumentException("해당 시험이 존재하지 않습니다. ID: " + id);
        }
        examRepository.deleteById(id);
    }
}