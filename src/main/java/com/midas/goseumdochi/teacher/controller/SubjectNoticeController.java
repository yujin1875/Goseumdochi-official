package com.midas.goseumdochi.teacher.controller;

import com.midas.goseumdochi.teacher.dto.SubjectNoticeDTO;
import com.midas.goseumdochi.teacher.service.SubjectNoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subjectnotice")
@RequiredArgsConstructor
public class SubjectNoticeController {

    private final SubjectNoticeService subjectNoticeService;

    @GetMapping("/lecture/{lectureId}")
    public ResponseEntity<List<SubjectNoticeDTO>> getNoticesByLectureId(@PathVariable Long lectureId) {
        List<SubjectNoticeDTO> notices = subjectNoticeService.getNoticesByLectureId(lectureId);
        return ResponseEntity.ok(notices);
    }
}
