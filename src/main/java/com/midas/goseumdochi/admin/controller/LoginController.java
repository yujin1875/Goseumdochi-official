package com.midas.goseumdochi.admin.controller;

import com.midas.goseumdochi.admin.dto.AdminDTO;
import com.midas.goseumdochi.admin.repository.AdminRepository;
import com.midas.goseumdochi.admin.service.AdminService;
import com.midas.goseumdochi.util.ai.EncDecService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class LoginController {

    private final AdminService adminService;

    // 로그인 처리
    @PostMapping("/login")
    public ResponseEntity<?> login(HttpSession session, @RequestParam String loginid, @RequestParam String password) {
        System.out.println("loginid: " + loginid + ", password: " + password);
        if (adminService.authenticate(loginid, password)) {
            session.setAttribute("loginId", loginid); // 로그인 성공 시 세션 저장
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("관리자 로그인 실패");
        }
    }

    // 현재 로그인한 관리자 정보 가져오기
    @GetMapping("/adminInfo")
    public ResponseEntity<?> getAdminInfo(HttpSession session) {
        Object loginIdObj = session.getAttribute("loginId");
        if (loginIdObj instanceof String loginId) {
            return ResponseEntity.ok("현재 로그인된 관리자: " + loginId);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
    }

    // 로그아웃 처리
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate(); // 세션 무효화
        return ResponseEntity.ok("로그아웃 성공");
    }
}
