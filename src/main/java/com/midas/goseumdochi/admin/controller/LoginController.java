package com.midas.goseumdochi.admin.controller;

import com.midas.goseumdochi.admin.dto.AdminDTO;
import com.midas.goseumdochi.admin.repository.AdminRepository;
import com.midas.goseumdochi.util.ai.BadwordService;
import com.midas.goseumdochi.util.ai.EncDecService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class LoginController {

    private final AdminRepository adminRepository;
    private final EncDecService encDecService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String loginid, @RequestParam String password) {
        if ("admin".equals(loginid) && "admin".equals(password)) { //복호화하여 비교
            return ResponseEntity.ok().build(); // 로그인 성공
        } else {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("관리자 로그인 실패"); // 로그인 실패
        }
    }
}
