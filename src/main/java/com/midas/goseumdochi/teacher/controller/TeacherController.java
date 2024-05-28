package com.midas.goseumdochi.teacher.controller;

import com.midas.goseumdochi.student.Dto.StudentDTO;
import com.midas.goseumdochi.student.Service.RegistLectureService;
import com.midas.goseumdochi.teacher.dto.AssignmentDTO;
import com.midas.goseumdochi.teacher.dto.LectureDTO;
import com.midas.goseumdochi.teacher.dto.TeacherDTO;
import com.midas.goseumdochi.teacher.dto.LectureMaterialDTO;
import com.midas.goseumdochi.teacher.service.AssignmentService;
import com.midas.goseumdochi.teacher.service.LectureService;
import com.midas.goseumdochi.teacher.service.TeacherService;
import com.midas.goseumdochi.teacher.service.LectureMaterialService;
import com.midas.goseumdochi.util.Service.MailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/teacher")
@RequiredArgsConstructor
public class TeacherController {
    private final TeacherService teacherService;
    private final MailService mailService;
    private final LectureMaterialService lectureMaterialService;
    private final AssignmentService assignmentService;
    private final LectureService lectureService;
    private final RegistLectureService registLectureService;

    // 선생 등록
    @PostMapping("/regist")
    public ResponseEntity<?> registTeacher(@RequestBody TeacherDTO inputTeacherDTO) {
        TeacherDTO teacherDTO = teacherService.setLoginidAndPassword(inputTeacherDTO);
        teacherService.regist(teacherDTO);

        // 선생 등록 성공, 원장에게 메일 전송
        mailService.mailSend(teacherService.getMailDTOForRegist(teacherDTO));

        return ResponseEntity.ok(teacherDTO); // 선생 dto 리턴
    }

    // 강의 등록
    @PostMapping("/lecture/regist")
    public ResponseEntity<?> registLecture(@RequestBody LectureDTO lectureDTO) {
        lectureService.regist(lectureDTO);

        return ResponseEntity.ok(lectureDTO);
    }

    // 선생의 모든 강의+시간 조희
    @GetMapping("/{teacherId}/lecture")
    public ResponseEntity<?> showLectureAndTimeList(@PathVariable Long teacherId) {
        List<LectureDTO> lectureDTOList = lectureService.getLectureAndTimeListByTeacher(teacherId);
        return ResponseEntity.ok(lectureDTOList);
    }

    // 검색어로 선생 강의+시간 조희
    @GetMapping("/{teacherId}/lecture/search")
    public ResponseEntity<?> searchLectureAndTimeList(@PathVariable Long teacherId, @RequestParam String word) {
        List<LectureDTO> lectureDTOList = lectureService.searchLectureAndTimeListByTeacher(teacherId, word);
        return ResponseEntity.ok(lectureDTOList);
    }

    // 강의를 수강하는 학생 리스트 출력
    @GetMapping("lecture/{lectureId}/student/exist")
    public ResponseEntity<?> showStudentExist(@PathVariable Long lectureId) {
        List<StudentDTO> studentDTOList = registLectureService.getExistStudentDTOList(lectureId);
        return ResponseEntity.ok(studentDTOList);
    }

    // 강의를 수강하지 않는 학생 리스트 출력
    @GetMapping("lecture/{lectureId}/student/non-exist")
    public ResponseEntity<?> showStudentNonExist(@PathVariable Long lectureId) {
        List<StudentDTO> studentDTOList = registLectureService.getNonExistStudentDTOList(lectureId);
        return ResponseEntity.ok(studentDTOList);
    }

    // 강의에 학생 등록
    @PostMapping("/lecture/{lectureId}/student/regist")
    public ResponseEntity<?> registStudentToLecture(@PathVariable Long lectureId, @RequestParam Long studentId) {
        registLectureService.regist(lectureId, studentId);
        return ResponseEntity.ok("강의 학생 등록 성공");
    }

    // 강의에 등록된 학생 삭제
    @PostMapping("lecture/{lectureId}/student/delete")
    public ResponseEntity<?> deleteStudentToLecture(@PathVariable Long lectureId, @RequestParam Long studentId) {
        if (registLectureService.delete(lectureId, studentId) == false)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("수강 삭제 실패");
        return ResponseEntity.ok("수강 삭제 성공");
    }

    // 새로운 강의 자료 생성
    @PostMapping("/lecture-material/new")
    public ResponseEntity<?> createNewMaterial(@RequestPart("material") LectureMaterialDTO lectureMaterialDTO,
                                               @RequestPart("file") MultipartFile file) throws IOException {
        String uploadDir = "uploads/";
        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        String fileName = file.getOriginalFilename();
        Path filePath = Paths.get(uploadDir, fileName);
        Files.write(filePath, file.getBytes());

        // 현재 로그인된 사용자 정보 가져오기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserName = authentication.getName();

        TeacherDTO currentTeacher = teacherService.findByLoginid(currentUserName);

        lectureMaterialDTO.setAuthor(currentTeacher.getName());
        lectureMaterialDTO.setAttachmentPath(filePath.toString());

        lectureMaterialService.saveLectureMaterial(lectureMaterialDTO);

        return ResponseEntity.ok("새로운 강의 자료 생성 완료");
    }

    // 모든 강의 자료 목록 조회
    @GetMapping("/lecture-material/list")
    public ResponseEntity<List<LectureMaterialDTO>> getAllMaterials() {
        List<LectureMaterialDTO> materials = lectureMaterialService.getAllLectureMaterials();
        return ResponseEntity.ok(materials);
    }

    // 특정 강의 자료 조회
    @GetMapping("/lecture-material/{id}")
    public ResponseEntity<LectureMaterialDTO> getMaterialById(@PathVariable Long id) {
        LectureMaterialDTO material = lectureMaterialService.getLectureMaterialById(id);
        return ResponseEntity.ok(material);
    }

    // 강의 자료 업데이트
    @PutMapping("/lecture-material/{id}")
    public ResponseEntity<?> updateMaterial(@PathVariable Long id,
                                            @RequestPart("material") LectureMaterialDTO lectureMaterialDTO,
                                            @RequestPart("file") MultipartFile file) throws IOException {
        String uploadDir = "uploads/";
        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        String fileName = file.getOriginalFilename();
        Path filePath = Paths.get(uploadDir, fileName);
        Files.write(filePath, file.getBytes());

        // 현재 로그인된 사용자 정보 가져오기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserName = authentication.getName();

        TeacherDTO currentTeacher = teacherService.findByLoginid(currentUserName);

        lectureMaterialDTO.setAuthor(currentTeacher.getName());
        lectureMaterialDTO.setAttachmentPath(filePath.toString());

        lectureMaterialService.updateLectureMaterial(id, lectureMaterialDTO);

        return ResponseEntity.ok("강의 자료 성공적으로 업데이트");
    }

    // 수업자료 삭제
    @DeleteMapping("/lecture-material/{id}")
    public ResponseEntity<?> deleteMaterial(@PathVariable Long id) {
        lectureMaterialService.deleteLectureMaterial(id);
        return ResponseEntity.ok("수업 자료가 성공적으로 삭제되었습니다.");
    }

    // 과제 추가
    @PostMapping("/assignment/new")
    public ResponseEntity<?> createNewAssignment(@RequestPart("assignment") AssignmentDTO assignmentDTO,
                                                 @RequestPart("file") MultipartFile file) throws IOException {
        String uploadDir = "uploads/assignments/";
        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdirs();
        }
        String fileName = file.getOriginalFilename();
        Path filePath = Paths.get(uploadDir, fileName);
        Files.write(filePath, file.getBytes());

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserName = authentication.getName();
        TeacherDTO currentTeacher = teacherService.findByLoginid(currentUserName);

        assignmentDTO.setAuthor(currentTeacher.getName());
        assignmentDTO.setAttachmentPath(filePath.toString());
        assignmentDTO.setCreatedAt(LocalDateTime.now());

        assignmentService.saveAssignment(assignmentDTO);
        return ResponseEntity.ok("새로운 과제가 생성되었습니다.");
    }

    // 과제 목록 조회
    @GetMapping("/assignments")
    public ResponseEntity<List<AssignmentDTO>> getAllAssignments() {
        List<AssignmentDTO> assignments = assignmentService.getAllAssignments();
        return ResponseEntity.ok(assignments);
    }

    // 특정 강의 자료 조회
    @GetMapping("/assignment/{id}")
    public ResponseEntity<AssignmentDTO> getAssignmentById(@PathVariable Long id) {
        AssignmentDTO assignment = assignmentService.getAssignmentById(id);
        return ResponseEntity.ok(assignment);
    }
}
