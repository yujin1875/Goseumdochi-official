package com.midas.goseumdochi.admin.controller;

import com.midas.goseumdochi.admin.dto.AdminDTO;
import com.midas.goseumdochi.admin.repository.AdminRepository;
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

    // 로그인 처리
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

    // 현재 로그인한 관리자 정보 가져오기
    @GetMapping("/adminInfo")
    public ResponseEntity<?> getAdminInfo(HttpSession session) {
        Object loginIdObj = session.getAttribute("loginId");
        String loginId = null;

        if (loginIdObj != null) {
            if (loginIdObj instanceof Long) {
                loginId = String.valueOf(loginIdObj); // Long을 String으로 변환
            } else {
                loginId = (String) loginIdObj; // 이미 String 타입인 경우
            }
        }

        if (loginId != null) {
            AdminDTO adminDTO = new AdminDTO(loginId); // 생성자를 통해 관리자 이름 설정
            return ResponseEntity.ok(adminDTO);
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
