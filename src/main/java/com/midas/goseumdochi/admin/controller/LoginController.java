package com.midas.goseumdochi.admin.controller;

import com.midas.goseumdochi.admin.dto.AdminDTO;
import com.midas.goseumdochi.admin.repository.AdminRepository;
import com.midas.goseumdochi.util.ai.BadwordService;
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

    private final AdminRepository adminRepository;
    private final EncDecService encDecService;

    // HttpSession을 사용하여 세션에 아이디 저장
    @PostMapping("/login")
    public ResponseEntity<?> login(HttpSession session, @RequestParam String loginid, @RequestParam String password) {
        if ("admin".equals(loginid) && "admin".equals(password)) {
            session.setAttribute("loginId", loginid); // 로그인 성공 시 아이디 저장
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("관리자 로그인 실패");
        }
    }

    @GetMapping("/adminInfo")
    public ResponseEntity<?> getAdminInfo(HttpSession session) {
        String loginId = (String) session.getAttribute("loginId");
        if (loginId != null) {
            AdminDTO adminDTO = new AdminDTO(loginId); // 생성자를 통해 관리자 이름 설정
            return ResponseEntity.ok(adminDTO);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
    }

}
