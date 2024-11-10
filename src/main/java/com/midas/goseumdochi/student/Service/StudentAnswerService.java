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

        // 문제 엔티티 조회
        ExamQuestionEntity question = examQuestionRepository.findByIdAndExamEntityId(studentAnswerDTO.getQuestionId(), studentAnswerDTO.getExamId())
                .orElseThrow(() -> new RuntimeException("해당 문제를 찾을 수 없습니다."));

        // 답안을 엔티티에 저장
        StudentAnswerEntity answerEntity = new StudentAnswerEntity();
        answerEntity.setStudentId(studentAnswerDTO.getStudentId());
        answerEntity.setQuestion(question);
        answerEntity.setAnswer(studentAnswerDTO.getAnswer());

        // 학생 답안을 표준화 (공백 제거, 소문자 변환)
        String studentAnswer = studentAnswerDTO.getAnswer().trim().toLowerCase();

        boolean isCorrect = false;

        // 문제 유형에 따라 정답 비교 로직을 다르게 처리
        if ("essay".equalsIgnoreCase(question.getType())) {
            // 서술형 문제일 경우, 여러 개의 정답 중 하나라도 일치하면 정답으로 처리
            List<String> correctAnswers = question.getAnswers();
            if (correctAnswers != null) {
                for (String correctAnswer : correctAnswers) {
                    correctAnswer = correctAnswer.trim().toLowerCase();
                    System.out.println("비교할 서술형 정답: " + correctAnswer + ", 학생 답안: " + studentAnswer);
                    if (correctAnswer.equals(studentAnswer)) {
                        isCorrect = true;
                        break;
                    }
                }
                System.out.println("최종 서술형 정답 비교 결과 (isCorrect): " + isCorrect);
            } else {
                System.out.println("서술형 문제의 correctAnswers가 null입니다.");
            }
        } else if ("multipleChoice".equalsIgnoreCase(question.getType())) {
            // 객관식 문제일 경우, 정답 인덱스에 해당하는 보기 텍스트와 비교
            String correctAnswerIndex = question.getCorrectAnswer();
            if (correctAnswerIndex != null) {
                try {
                    int correctIndex = Integer.parseInt(correctAnswerIndex.trim()) - 1; // 정답 인덱스가 1부터 시작한다고 가정
                    List<String> options = question.getAnswers();

                    // 인덱스 범위 확인 및 비교
                    if (correctIndex >= 0 && correctIndex < options.size()) {
                        String correctAnswerText = options.get(correctIndex).trim().toLowerCase();
                        isCorrect = correctAnswerText.equals(studentAnswer);

                        // 디버깅 로그 추가
                        System.out.println("학생 답안: " + studentAnswer);
                        System.out.println("정답 인덱스: " + correctIndex + ", 정답 보기 텍스트: " + correctAnswerText);
                        System.out.println("비교 결과 (isCorrect): " + isCorrect);
                    } else {
                        System.out.println("정답 인덱스가 보기 목록 범위를 벗어났습니다.");
                    }
                } catch (NumberFormatException e) {
                    System.out.println("정답 인덱스 형식이 잘못되었습니다: " + question.getCorrectAnswer());
                }
            } else {
                System.out.println("객관식 문제의 correctAnswer가 null입니다.");
            }
        }

        // 정답 여부에 따른 점수 설정
        if (isCorrect) {
            answerEntity.setScore(question.getPoints()); // 정답일 경우 배점 설정
        } else {
            answerEntity.setScore(0); // 오답일 경우 0점 설정
        }

        // 최종 로그 출력
        System.out.println("정답 여부: " + isCorrect + ", 배점: " + answerEntity.getScore());

        // 답안 저장
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

    public List<StudentDTO> getStudentsByExamIdWithScore(Long examId, Long lectureId) {
        List<StudentEntity> students = studentRepository.findStudentsByLectureId(lectureId); // lectureId로 학생 목록 가져오기
        return students.stream()
            .map(student -> {
                StudentDTO studentDTO = StudentDTO.toStudentDTO(student);

                List<StudentAnswerEntity> answerEntities = studentAnswerRepository.findByStudentIdAndExamId(student.getId(), examId);

                if (!answerEntities.isEmpty()) {
                    StudentAnswerDTO studentAnswerDTO = new StudentAnswerDTO();
                    studentAnswerDTO.setScore(answerEntities.get(0).getScore());
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
