package com.midas.goseumdochi.teacher.service;

import com.midas.goseumdochi.teacher.dto.ExamQuestionDTO;
import com.midas.goseumdochi.teacher.entity.ExamEntity;
import com.midas.goseumdochi.teacher.entity.ExamQuestionEntity;
import com.midas.goseumdochi.teacher.repository.ExamQuestionRepository;
import com.midas.goseumdochi.teacher.repository.ExamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExamQuestionService {
    private final ExamQuestionRepository examQuestionRepository;
    private final ExamRepository examRepository;

    public void saveExamQuestion(ExamQuestionDTO examQuestionDTO) {
        ExamEntity examEntity = examRepository.findById(examQuestionDTO.getExamId())
                .orElseThrow(() -> new IllegalArgumentException("해당 시험을 찾을 수 없습니다: " + examQuestionDTO.getExamId()));

        ExamQuestionEntity entity = new ExamQuestionEntity();
        entity.setType(examQuestionDTO.getType());
        entity.setText(examQuestionDTO.getText());
        entity.setPoints(examQuestionDTO.getPoints());
        entity.setAnswers(examQuestionDTO.getAnswers());
        entity.setCorrectAnswer(examQuestionDTO.getCorrectAnswer());
        entity.setExamEntity(examEntity);

        examQuestionRepository.save(entity);

        // 시험의 총점수 업데이트
        int totalPoints = examEntity.getQuestions().stream().mapToInt(ExamQuestionEntity::getPoints).sum();
        examEntity.setPoints(totalPoints);
        examRepository.save(examEntity);
    }


    public List<ExamQuestionDTO> getExamQuestionsByExamId(Long examId) {
        return examQuestionRepository.findAllByExamEntityId(examId).stream()
                .map(entity -> new ExamQuestionDTO(
                        entity.getId(),
                        entity.getType(),
                        entity.getText(),
                        entity.getPoints(),
                        entity.getAnswers(),
                        entity.getCorrectAnswer(),
                        entity.getExamEntity().getId()))
                .collect(Collectors.toList());
    }

    public void updateExamQuestion(Long id, ExamQuestionDTO examQuestionDTO) {
        ExamQuestionEntity entity = examQuestionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("해당 문제를 찾을 수 없습니다: " + id));

        entity.setType(examQuestionDTO.getType());
        entity.setText(examQuestionDTO.getText());
        entity.setPoints(examQuestionDTO.getPoints());
        entity.setAnswers(examQuestionDTO.getAnswers());
        entity.setCorrectAnswer(examQuestionDTO.getCorrectAnswer());

        examQuestionRepository.save(entity);
    }

    public void deleteExamQuestion(Long id) {
        if (!examQuestionRepository.existsById(id)) {
            throw new IllegalArgumentException("해당 문제가 존재하지 않습니다. ID: " + id);
        }
        examQuestionRepository.deleteById(id);
    }
}
