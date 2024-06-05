package com.midas.goseumdochi.director.controller;

import com.midas.goseumdochi.director.dto.DirectorDTO;
import com.midas.goseumdochi.academy.dto.StudentAcademyDTO;
import com.midas.goseumdochi.academy.service.StudentAcademyService;
import com.midas.goseumdochi.student.Dto.StudentDTO;
import com.midas.goseumdochi.student.Service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.midas.goseumdochi.director.service.DirectorService;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/api/director")
@RequiredArgsConstructor
public class DirectorController {
    private final DirectorService directorService;
    private final StudentService studentService;
    private final StudentAcademyService studentAcademyService;

    // 로그인 폼 작성 후
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String directorLoginid, @RequestParam String directorPassword) {
        DirectorDTO directorDTO = directorService.login(directorLoginid, directorPassword);

        if(directorDTO == null) { // 로그인 실패
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("원장 로그인 실패");
        }
        // 로그인 성공
        return ResponseEntity.ok(directorDTO.getId()); // 원장 id 리턴
    }

    // 원장님이 학생 찾을 때 (이름, 전화번호 이용) *--> 학생 Controller에 보내도 됨
    @GetMapping("/academy/{academyId}/findStudent")
    public ResponseEntity<?> findStudent(@PathVariable Long academyId, @RequestParam String inputStudentName, @RequestParam String inputStudentPhoneNumber) {
        StudentDTO studentDTO = studentService.findStudentByNameAndPhoneNumber(inputStudentName, inputStudentPhoneNumber);

        if(studentDTO == null) { // 찾기 실패
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("해당 학생이 존재하지 않습니다.");
        }
        // 학생 찾기 성공 후 학원에 등록되어있는지 검사
        StudentAcademyDTO registDTO = studentAcademyService.getStudentDto(studentDTO.getId(), academyId);
        Map<String, Object> result = new HashMap<>();

        if(registDTO == null) // 학생이 아직 학원에 등록되지 않음
            result.put("studentAcademyId", null);
        else // 학생이 이미 학원에 등록됨
            result.put("studentAcademyId", registDTO.getId());
        result.put("student", studentDTO);

        return ResponseEntity.ok(result); // -> 리액트에서 찾기 성공했을 때 변수 설정 해줘야함
    }

    // 학생 등록
    @PostMapping("/academy/{academyId}/registStudent")
    public ResponseEntity<?> registStudent(@PathVariable Long academyId, @RequestParam Long studentId) { // (학생id, 학원id) 입력받음
        // 학생 등록 실패 로직
        if(studentId == null) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("학생 등록 실패.");
        }
        // 학생 등록 성공
        StudentAcademyDTO studentAcademyDTO = studentAcademyService.registStudentAcademy(studentId, academyId);// 등록
        return ResponseEntity.ok(studentAcademyDTO);
    }
}