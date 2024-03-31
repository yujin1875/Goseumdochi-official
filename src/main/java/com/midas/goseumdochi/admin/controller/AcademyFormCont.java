package com.midas.goseumdochi.admin.controller;

import com.midas.goseumdochi.director.entity.AcademyFormEntity;
import com.midas.goseumdochi.director.repository.AcademyFormRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class AcademyFormCont {

    private final AcademyFormRepository academyFormRepository;

    @Autowired
    public AcademyFormCont(AcademyFormRepository academyFormRepository) {
        this.academyFormRepository = academyFormRepository;
    }

    @GetMapping("/admin/academyForm")
    public String getAllAcademyForms(Model model) {
        List<AcademyFormEntity> academyForms = academyFormRepository.findAll();
        model.addAttribute("academyForms", academyForms);
        return "admin/academyForm";
    }
}
