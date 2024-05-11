package com.midas.goseumdochi.director.controller;

import com.midas.goseumdochi.director.dto.DirectorDTO;
import com.midas.goseumdochi.director.service.DirectorService;
import com.midas.goseumdochi.student.Component.OtherComponent;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.IOException;

@Controller
@RequestMapping("/director")
@RequiredArgsConstructor
public class DirectorController {
    private final DirectorService directorService;

    // 로그인 폼
    @GetMapping("/login")
    public String loginForm(){
        return "director/login";
    }

    // 로그인 폼 작성 후
    @PostMapping("/login")
    public String login(@RequestParam("directorLoginid") String directorName,
                        @RequestParam("directorPassword") String directorPhoneNumber,
                        Model model, HttpSession session, HttpServletResponse response) throws IOException {
        DirectorDTO directorDTO = directorService.findDirector(directorName, directorPhoneNumber);

        if(directorDTO == null) { // 로그인 실패
            OtherComponent.AlertMessage(response, "원장 로그인 실패");
            return null;
        }
        // 로그인 성공
        session.setAttribute("directorId", directorDTO.getId());
        return "director/main";
    }

    // 선생님 등록 화면
    @GetMapping("/regist_teacher")
    public String registTeacherForm() {
        return "regist_teacher";
    }
}
