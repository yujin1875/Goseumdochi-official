package com.midas.goseumdochi.student.Service;

import com.midas.goseumdochi.student.Dto.StudentAnswerDTO;
import com.midas.goseumdochi.student.entity.StudentAnswerEntity;
import com.midas.goseumdochi.student.Repository.StudentAnswerRepository;
import com.midas.goseumdochi.teacher.entity.ExamQuestionEntity;
import com.midas.goseumdochi.teacher.repository.ExamQuestionRepository;
import com.midas.goseumdochi.teacher.repository.ExamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudentAnswerService {
    private final StudentAnswerRepository studentAnswerRepository;
    private final ExamQuestionRepository examQuestionRepository;

    public void saveStudentAnswer(StudentAnswerDTO studentAnswerDTO) {

        ExamQuestionEntity question = examQuestionRepository.findByIdAndExamEntityId(studentAnswerDTO.getQuestionId(), studentAnswerDTO.getExamId())
                .orElseThrow(() -> new RuntimeException("해당 문제를 찾을 수 없습니다."));

        StudentAnswerEntity answerEntity = new StudentAnswerEntity();
        answerEntity.setStudentId(studentAnswerDTO.getStudentId());
        answerEntity.setQuestion(question);
        answerEntity.setAnswer(studentAnswerDTO.getAnswer());
        answerEntity.setScore(studentAnswerDTO.getScore());

        studentAnswerRepository.save(answerEntity);
    }

    public List<StudentAnswerDTO> getStudentAnswers(Long studentId, Long examId) {
        return studentAnswerRepository.findByStudentIdAndQuestionExamEntityId(studentId, examId).stream()
                .map(entity -> new StudentAnswerDTO(
                        entity.getId(),
                        entity.getQuestion().getId(), // questionId 설정
                        entity.getStudentId(),
                        entity.getAnswer(),
                        entity.getQuestion().getExamEntity().getId(), // examId 설정
                        entity.getScore() // score 설정
                ))
                .collect(Collectors.toList());
    }
}
