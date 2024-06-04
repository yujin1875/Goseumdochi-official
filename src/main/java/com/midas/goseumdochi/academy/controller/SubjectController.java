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

    @GetMapping("/findList/academy/{academyId}")
    public ResponseEntity<?> findSubjectList(@PathVariable Long academyId) {
        List<SubjectDTO> subjectDTOList = subjectService.findAllByAcademyId(academyId);

        return ResponseEntity.ok(subjectDTOList);
    }
}
