package com.midas.goseumdochi.director.controller;

import com.midas.goseumdochi.director.dto.AcademyFormDTO;
import com.midas.goseumdochi.director.service.AcademyFormService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/academy/form")
@RequiredArgsConstructor
public class AcademyFormController {
    private final AcademyFormService academyFormService;

    @GetMapping()
    public String academyForm(Model model) {
        model.addAttribute("academyFormDTO", new AcademyFormDTO());
        return "director/academy_form";
    }

    @PostMapping()
    public String academyFormSubmit(@ModelAttribute AcademyFormDTO academyFormDTO) {
        // 신청서 이미 있으면 중복처리 할지

        academyFormService.submit(academyFormDTO);
        return "index"; // 시작화면
    }
}
