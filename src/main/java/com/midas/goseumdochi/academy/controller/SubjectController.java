package com.midas.goseumdochi.academy.controller;

import com.midas.goseumdochi.academy.dto.SubjectDTO;
import com.midas.goseumdochi.academy.service.SubjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subject")
@RequiredArgsConstructor
public class SubjectController {
    private final SubjectService subjectService;

    // 과목 등록
    @PostMapping("/regist/academy/{academyId}")
    public ResponseEntity<?> registSubject(@PathVariable Long academyId, @RequestParam String inputSubjectName) { // (이름, 학원 id) 전달
        SubjectDTO findSubjectDTO = subjectService.findByNameAndAcademyId(inputSubjectName, academyId);

        if(findSubjectDTO != null) { // 중복된 과목이 존재
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED) // 에러 상태
                    .body("과목 등록 실패. 중복된 과목 입니다.");
        }

        // 과목 등록 성공
        SubjectDTO registSubjectDTO = subjectService.regist(inputSubjectName, academyId);
        return ResponseEntity.ok(registSubjectDTO);
    }

    // 학원에 등록된 과목 리스트 찾기
    @GetMapping("/findList/academy/{academyId}")
    public ResponseEntity<?> findSubjectList(@PathVariable Long academyId) {
        List<SubjectDTO> subjectDTOList = subjectService.findAllByAcademyId(academyId);

        return ResponseEntity.ok(subjectDTOList);
    }

    // 과목 수정
    @PostMapping("/update/subject/{subjectId}")
    public ResponseEntity<?> updateSubject(@PathVariable Long subjectId, @RequestParam String inputSubjectName) { // (이름, 학원 id) 전달
        SubjectDTO subjectDTO = subjectService.update(subjectId, inputSubjectName);

        if(subjectDTO != null) { // 과목 수정 실패
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED) // 에러 상태
                    .body("과목 수정 실패.");
        }

        // 과목 등록 성공
        return ResponseEntity.ok(subjectDTO);
    }

    // 과목 삭제
    @PostMapping("/delete/subject/{subjectId}")
    public ResponseEntity<?> deleteSubject(@PathVariable Long subjectId) {
        if(subjectService.delete(subjectId) == false) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED) // 에러 상태
                    .body("과목 삭제 실패.");
        }

        // 삭제 성공
        return ResponseEntity.ok("과목 삭제 성공");
    }
}
