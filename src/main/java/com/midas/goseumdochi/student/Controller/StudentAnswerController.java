package com.midas.goseumdochi.student.Controller;

import com.midas.goseumdochi.student.Dto.StudentAnswerDTO;
import com.midas.goseumdochi.student.Dto.StudentDTO;
import com.midas.goseumdochi.student.Repository.StudentAnswerRepository;
import com.midas.goseumdochi.student.Repository.StudentRepository;
import com.midas.goseumdochi.student.Service.StudentAnswerService;
import com.midas.goseumdochi.student.entity.StudentAnswerEntity;
import com.midas.goseumdochi.student.entity.StudentEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/student/exams/{examId}/answers")
@RequiredArgsConstructor
public class StudentAnswerController {

    private final StudentAnswerService studentAnswerService;
    private final StudentAnswerRepository studentAnswerRepository;
    private final StudentRepository studentRepository;

    // 학생이 답안을 제출하는 엔드포인트
    @PostMapping
    public ResponseEntity<?> submitAnswer(@PathVariable Long examId, @RequestBody List<StudentAnswerDTO> answerDTOList) {
        System.out.println("Received data: " + answerDTOList);
        answerDTOList.forEach(answerDTO -> {
            answerDTO.setExamId(examId); // examId를 DTO에 설정
            studentAnswerService.saveStudentAnswer(answerDTO);
        });
        return ResponseEntity.ok("답안이 성공적으로 제출되었습니다.");
    }

    // 특정 시험에 대한 학생의 답안을 조회하는 엔드포인트
    @GetMapping("/{studentId}")
    public ResponseEntity<List<StudentAnswerDTO>> getAnswersByExamAndStudent(@PathVariable Long examId, @PathVariable Long studentId) {
        List<StudentAnswerDTO> answers = studentAnswerService.getStudentAnswers(studentId, examId);
        return ResponseEntity.ok(answers);
    }

    // 특정 시험에 등록된 학생들의 점수 목록을 조회하는 엔드포인트
    @GetMapping("/students-with-scores")
    public ResponseEntity<List<StudentDTO>> getStudentsByExamIdWithScore(@PathVariable Long examId, @RequestParam Long lectureId) {
        List<StudentDTO> studentsWithScores = studentAnswerService.getStudentsByExamIdWithScore(examId, lectureId);
        return ResponseEntity.ok(studentsWithScores);
    }
}
