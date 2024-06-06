package com.midas.goseumdochi.teacher.controller;

import com.midas.goseumdochi.teacher.dto.AssignmentDTO;
import com.midas.goseumdochi.teacher.dto.LectureMaterialDTO;
import com.midas.goseumdochi.teacher.service.AssignmentService;
import com.midas.goseumdochi.teacher.service.LectureMaterialService;
import com.midas.goseumdochi.util.component.PageComponent;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/lecture")
@RequiredArgsConstructor
public class LectureController {
    private final PageComponent pageComponent;
    private final LectureMaterialService lectureMaterialService;
    private final AssignmentService assignmentService;

    // 강의 자료 페이징
    @GetMapping("/{lectureId}/material/paging")
    public ResponseEntity<?> pagingMaterial(@PathVariable Long lectureId, @PageableDefault(page = 1) Pageable pageable) {
        Page<LectureMaterialDTO> lectureMaterialDTOPage = lectureMaterialService.pagingMaterial(lectureId, pageable);
        int blockLimit = 4;
        int startPage = pageComponent.getStartPage(pageable.getPageNumber(), blockLimit);
        int endPage = pageComponent.getEndPage(startPage, blockLimit, lectureMaterialDTOPage.getTotalPages());

        Map<String, Object> response = new HashMap<>();
        response.put("material", lectureMaterialDTOPage);
        response.put("startPage", startPage);
        response.put("endPage", endPage);

        return ResponseEntity.ok(response);
    }

    // 과제 페이징
    @GetMapping("/{lectureId}/assignment/paging")
    public ResponseEntity<?> pagingAssignment(@PathVariable Long lectureId, @PageableDefault(page = 1) Pageable pageable) {
        Page<AssignmentDTO> assignmentDTOPage = assignmentService.pagingAssignment(lectureId, pageable);
        int blockLimit = 3;
        int startPage = pageComponent.getStartPage(pageable.getPageNumber(), blockLimit);
        int endPage = pageComponent.getEndPage(startPage, blockLimit, assignmentDTOPage.getTotalPages());

        Map<String, Object> response = new HashMap<>();
        response.put("material", assignmentDTOPage);
        response.put("startPage", startPage);
        response.put("endPage", endPage);

        return ResponseEntity.ok(response);
    }
}
