package com.midas.goseumdochi.admin.controller;

import com.midas.goseumdochi.admin.service.AcademyFormServ;
import com.midas.goseumdochi.director.entity.AcademyFormEntity;
import com.midas.goseumdochi.director.repository.AcademyFormRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
public class AcademyFormCont {

    private final AcademyFormRepository academyFormRepository;

    @Autowired
    public AcademyFormCont(AcademyFormRepository academyFormRepository) {
        this.academyFormRepository = academyFormRepository;
    }

    @Autowired
    private HttpSession httpSession;

    private boolean isLoggedIn() {
        // 세션에서 관리자 ID를 가져와서 확인
        return httpSession.getAttribute("adminId") != null;
    }

    @GetMapping("/admin/academyForm")
    public String getAllAcademyForms(Model model) {
        // 로그인 상태를 확인하고, 로그인되지 않은 경우, 로그인 페이지로 ㄱㄱ
        if (!isLoggedIn()) {
            return "redirect:/admin/login";
        }

        List<AcademyFormEntity> academyForms = academyFormRepository.findAll();
        model.addAttribute("academyForms", academyForms);
        return "admin/academyForm";
    }

    @Autowired
    private AcademyFormServ academyFormServ;

    @PostMapping("/admin/accept") // 수락 버튼 눌렀을 때
    public String acceptAcademyForm(@RequestParam Long academyFormId) {
        academyFormServ.acceptAcademyForm(academyFormId);
        return "redirect:/admin/academyForm";
    }

    @PostMapping("/admin/reject") // 거절 버튼 눌렀을 때
    public String rejectAcademyForm(@RequestParam Long academyFormId) {
        academyFormServ.rejectAcademyForm(academyFormId);
        return "redirect:/admin/academyForm";
    }
}