package com.midas.goseumdochi.teacher.controller;

import com.midas.goseumdochi.teacher.dto.ExamDTO;
import com.midas.goseumdochi.teacher.dto.ExamQuestionDTO;
import com.midas.goseumdochi.teacher.service.ExamQuestionService;
import com.midas.goseumdochi.teacher.service.ExamService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teacher/exams")
@RequiredArgsConstructor
public class ExamController {
    private final ExamService examService;

    @PostMapping("/lecture/{lectureId}/new")
    public ResponseEntity<?> createNewExam(@PathVariable Long lectureId, @RequestBody ExamDTO examDTO) {
        examDTO.setLectureId(lectureId);
        examService.saveExam(examDTO);
        return ResponseEntity.ok("새로운 시험이 생성되었습니다.");
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExamDTO> getExamById(@PathVariable Long id) {
        return ResponseEntity.ok(examService.getExamById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateExam(@PathVariable Long id, @RequestBody ExamDTO examDTO) {
        examService.updateExam(id, examDTO);
        return ResponseEntity.ok("시험이 성공적으로 업데이트되었습니다.");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteExam(@PathVariable Long id) {
        examService.deleteExam(id);
        return ResponseEntity.ok("시험이 성공적으로 삭제되었습니다.");
    }
}
