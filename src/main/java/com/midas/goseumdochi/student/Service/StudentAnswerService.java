package com.midas.goseumdochi.student.Service;

import com.midas.goseumdochi.student.Dto.StudentAnswerDTO;
import com.midas.goseumdochi.student.Dto.StudentDTO;
import com.midas.goseumdochi.student.Repository.StudentRepository;
import com.midas.goseumdochi.student.entity.StudentAnswerEntity;
import com.midas.goseumdochi.student.Repository.StudentAnswerRepository;
import com.midas.goseumdochi.student.entity.StudentEntity;
import com.midas.goseumdochi.teacher.entity.ExamQuestionEntity;
import com.midas.goseumdochi.teacher.repository.ExamQuestionRepository;
import com.midas.goseumdochi.teacher.repository.ExamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudentAnswerService {
    private final StudentAnswerRepository studentAnswerRepository;
    private final ExamQuestionRepository examQuestionRepository;
    private final StudentRepository studentRepository;

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

    public List<StudentDTO> getStudentsByExamIdWithScore(Long examId) {
        List<StudentEntity> students = studentRepository.findStudentsByLectureId(examId); // 강의 ID로 학생 목록 가져오기
        return students.stream()
                .map(student -> {
                    StudentDTO studentDTO = StudentDTO.toStudentDTO(student);

                    Optional<StudentAnswerEntity> answerEntity = studentAnswerRepository.findByStudentIdAndExamId(student.getId(), examId);

                    if (answerEntity.isPresent()) {
                        StudentAnswerDTO studentAnswerDTO = new StudentAnswerDTO();
                        studentAnswerDTO.setScore(answerEntity.get().getScore());
                        studentDTO.setExamAnswer(studentAnswerDTO);
                    } else {
                        StudentAnswerDTO studentAnswerDTO = new StudentAnswerDTO();
                        studentAnswerDTO.setScore(0); // 미제출인 경우 기본 점수 0 설정
                        studentDTO.setExamAnswer(studentAnswerDTO);
                    }
                    return studentDTO;
                })
                .collect(Collectors.toList());
    }
}
