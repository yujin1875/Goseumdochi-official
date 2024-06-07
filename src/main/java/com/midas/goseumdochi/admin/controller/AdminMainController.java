package com.midas.goseumdochi.admin.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/main")
public class AdminMainController {

    @Autowired
    private HttpSession httpSession;

    private boolean isLoggedIn() {
        // 세션에서 관리자 ID를 가져와서 확인
        return httpSession.getAttribute("adminId") != null;
    }

    private String getAdminName() {
        // 세션에서 관리자 이름을 가져옵니다.
        return (String) httpSession.getAttribute("adminName");
    }

    @RequestMapping("/info")
    public String getAdminInfo() {
        if (isLoggedIn()) {
            return "관리자: " + getAdminName() + "님";
        } else {
            return "로그인이 필요합니다.";
        }
    }
}
