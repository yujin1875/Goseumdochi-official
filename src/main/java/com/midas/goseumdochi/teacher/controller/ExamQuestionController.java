package com.midas.goseumdochi.teacher.controller;

import com.midas.goseumdochi.teacher.dto.ExamQuestionDTO;
import com.midas.goseumdochi.teacher.service.ExamQuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teacher/exams/{examId}/questions")
@RequiredArgsConstructor
public class ExamQuestionController {
    private final ExamQuestionService examQuestionService;

    @PostMapping
    public ResponseEntity<?> createQuestion(@PathVariable Long examId, @RequestBody ExamQuestionDTO examQuestionDTO) {
        examQuestionDTO.setExamId(examId);
        examQuestionService.saveExamQuestion(examQuestionDTO);
        return ResponseEntity.ok("시험 문제가 성공적으로 생성되었습니다.");
    }


    @GetMapping
    public ResponseEntity<List<ExamQuestionDTO>> getQuestionsByExamId(@PathVariable Long examId) {
        return ResponseEntity.ok(examQuestionService.getExamQuestionsByExamId(examId));
    }

    @PutMapping("/{questionId}")
    public ResponseEntity<?> updateQuestion(@PathVariable Long questionId, @RequestBody ExamQuestionDTO examQuestionDTO) {
        examQuestionService.updateExamQuestion(questionId, examQuestionDTO);
        return ResponseEntity.ok("시험 문제가 성공적으로 업데이트되었습니다.");
    }

    @DeleteMapping("/{questionId}")
    public ResponseEntity<?> deleteQuestion(@PathVariable Long questionId) {
        examQuestionService.deleteExamQuestion(questionId);
        return ResponseEntity.ok("시험 문제가 성공적으로 삭제되었습니다.");
    }
}