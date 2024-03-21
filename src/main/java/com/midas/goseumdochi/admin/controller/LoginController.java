package com.midas.goseumdochi.admin.controller;

import com.midas.goseumdochi.admin.entity.AdminEntity;
import com.midas.goseumdochi.admin.repository.AdminRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.HashMap;
import java.util.Map;

@Controller
public class LoginController {

    @Autowired
    private AdminRepository adminRepository;

    private Map<String, String> adminCredentials;

    @PostConstruct
    public void init() {
        adminCredentials = new HashMap<>();
        // 데이터베이스에서 모든 admin 레코드를 가져와서 맵에 추가함 (즉, 관리자 테이블에 있는 사람들은 전부 로그인 가능)
        Iterable<AdminEntity> admins = adminRepository.findAll();
        for (AdminEntity admin : admins) {
            adminCredentials.put(admin.getId(), admin.getPassword());
        }
    }

    @GetMapping("/admin/login")
    public String showLoginForm() {
        return "admin/login";
    }

    @PostMapping("/admin/login")
    public String login(@RequestParam("username") String username,
                        @RequestParam("password") String password,
                        Model model) {
        // 입력된 사용자 이름이 맵에 있는지 확인하고 비밀번호가 일치하는지 확인
        if (adminCredentials.containsKey(username) && adminCredentials.get(username).equals(password)) {
            // 로그인 성공 시 메인 페이지로 이동합니다.
            return "admin/main";
        } else {
            // 로그인 실패
            model.addAttribute("error", "로그인 실패");
            return "admin/login";
        }
    }
}