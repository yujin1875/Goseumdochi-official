package com.midas.goseumdochi.director.controller;

import com.midas.goseumdochi.director.dto.AcademyFormDTO;
import com.midas.goseumdochi.director.service.AcademyFormService;
import com.midas.goseumdochi.student.Component.OtherComponent;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;


@Controller
@RequestMapping("/academy/form")
@RequiredArgsConstructor
public class AcademyFormController {
    private final AcademyFormService academyFormService;

    // 학원 신청서 폼
    @GetMapping()
    public String academyForm(Model model) {
        model.addAttribute("academyFormDTO", new AcademyFormDTO());
        return "director/academy_form";
    }
    // 학원 신청서 폼 작성 후
    @PostMapping()
    public String submitAcademyForm(@ModelAttribute AcademyFormDTO academyFormDTO, HttpServletResponse response) throws IOException {
        // 신청서 이미 있으면 중복처리
        AcademyFormDTO findAcademyForm = academyFormService.findAcademyForm(academyFormDTO.getDirectorName(),
                academyFormDTO.getDirectorPhoneNumber());

        if(findAcademyForm != null) { // 신청서 제출 실패
            OtherComponent.AlertMessage(response, "중복된 원장 정보입니다.");
            return null;
        }
        //성공
        academyFormService.submit(academyFormDTO);
        return "index"; // 시작화면
    }

    // 학원 신청서 찾기
    @GetMapping("/find")
    public String findAcademyForm() {
        return "director/academy_form_find";
    }
    // 학원 신청서 찾기 작성 후
    @PostMapping("/find")
    public String openAcademyForm(@RequestParam("directorName") String directorName,
                                  @RequestParam("directorPhoneNumber") String directorPhoneNumber,
                                  Model model, HttpSession session, HttpServletResponse response) throws IOException {
        AcademyFormDTO findAcademyForm = academyFormService.findAcademyForm(directorName, directorPhoneNumber);

        if(findAcademyForm == null) { // 찾기 실패 (존재하지 않는 원장)
            OtherComponent.AlertMessage(response, "존재하지 않는 정보입니다.");
            return null;
        }
        // 찾기 성공
        model.addAttribute("academyFormDTO", findAcademyForm);
        session.setAttribute("findAFid", findAcademyForm.getId());
        return "director/academy_form_update";
    }

    // 학원 신청서 수정 작성 후
    // 수정 폼을 따로 만들어야하는데 개귀찮네
    @PostMapping("/update")
    public String updateAcademyForm(@ModelAttribute AcademyFormDTO academyFormDTO,  HttpSession session,
                                    HttpServletResponse response) throws IOException {
        Long updateId = (Long) session.getAttribute("findAFid");
        academyFormDTO.setId(updateId);
        int resultCheck = academyFormService.checkUpdate(academyFormDTO);

        if(resultCheck == 0) {
            OtherComponent.AlertMessage(response, "중복된 원장 정보입니다.");
            return null;
        }
        // 성공
        academyFormService.update(academyFormDTO);
        return "index";
    }
}
