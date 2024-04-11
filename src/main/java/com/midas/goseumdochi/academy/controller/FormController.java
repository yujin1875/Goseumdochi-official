package com.midas.goseumdochi.academy.controller;

import com.midas.goseumdochi.director.dto.AcademyFormDTO;
import com.midas.goseumdochi.director.service.AcademyFormService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@RestController // 리액트 받는 컨트롤러는 RestController 인가바
//@CrossOrigin // react와 spring을 연결 시킬 수 있다. API를 연결해준다
@RequiredArgsConstructor
public class FormController {
    private final AcademyFormService academyFormService;

    @GetMapping("/api/demo-web")
    public List<String> Hello(){
        return Arrays.asList("리액트 스프링 ", "연결 성공");
    }

    @PostMapping("/api/academy/form")
    public ResponseEntity<?> submitAcademyForm(@RequestBody AcademyFormDTO academyFormDTO, HttpServletResponse response) throws IOException {
        // 신청서 이미 있으면 중복처리
        AcademyFormDTO findAcademyForm = academyFormService.findAcademyForm(academyFormDTO.getDirectorName(),
                academyFormDTO.getDirectorPhoneNumber());

        if(findAcademyForm != null) { // 신청서 제출 실패
            // 로그인 실패 시, ResponseEntity에 에러 메시지와 함께 401 상태 코드를 반환
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED) // 에러 상태
                    .body("신청서 등록 실패. 중복된 원장 정보입니다."); // 팝업 띄울 메시지 리턴
        }
        // 성공
        academyFormService.submit(academyFormDTO);
        return ResponseEntity.ok(academyFormDTO); // LoginDto 객체를 담아서 반환
        //** id는 비어있다
    }
}