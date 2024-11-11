package com.midas.goseumdochi.teacher.controller;

import com.midas.goseumdochi.student.Service.RegistLectureService;
import com.midas.goseumdochi.teacher.dto.AssignmentDTO;
import com.midas.goseumdochi.teacher.dto.LectureMaterialDTO;
import com.midas.goseumdochi.teacher.service.AssignmentService;
import com.midas.goseumdochi.teacher.service.LectureMaterialService;
import com.midas.goseumdochi.teacher.service.LectureService;
import com.midas.goseumdochi.util.Dto.NameDTO;
import com.midas.goseumdochi.util.component.PageComponent;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/lecture")
@RequiredArgsConstructor
public class LectureController {
    private final LectureService lectureService;
    private final PageComponent pageComponent;
    private final LectureMaterialService lectureMaterialService;
    private final AssignmentService assignmentService;
    private final RegistLectureService registLectureService;

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
        response.put("assignment", assignmentDTOPage);
        response.put("startPage", startPage);
        response.put("endPage", endPage);

        return ResponseEntity.ok(response);
    }

    // 강의 선생님 '이름' 리스트 조회 (원래 리스트는 필요 없지만 학생과 맞추려고)
    @GetMapping("/{lectureId}/teacher/name")
    public ResponseEntity<?> getTeacherNameListofLecture(@PathVariable Long lectureId) {
        List<NameDTO> teacherNameList = new ArrayList<>();
        // 배열로 반환
        teacherNameList.add(lectureService.getTeacherNameOfLecture(lectureId));
        return ResponseEntity.ok(teacherNameList);
    }

    // 강의 학생 '이름' 리스트 조회
    @GetMapping("/{lectureId}/student/name")
    public ResponseEntity<?> getStudentNameListofLecture(@PathVariable Long lectureId) {
        List<NameDTO> studentNameList = registLectureService.getExistStudentNameList(lectureId);
        return ResponseEntity.ok(studentNameList);
    }

    // 강의 삭제
    @DeleteMapping("/{lectureId}/delete")
    public ResponseEntity<?> deleteLecture(@PathVariable Long lectureId) {
        // 삭제 실패
        if (!lectureService.deleteLecture(lectureId))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("강의 삭제 실패");
        // 삭제 성공
        return ResponseEntity.ok("강의 삭제 성공");
    }
}
