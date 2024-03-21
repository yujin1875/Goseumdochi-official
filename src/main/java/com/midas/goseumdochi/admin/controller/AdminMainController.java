package com.midas.goseumdochi.admin.controller;

import org.springframework.web.bind.annotation.GetMapping;

public class AdminMainController {
//    private final AcademyFormRepository academyFormRepository;
//    private final StudentRepository studentRepository;

    @GetMapping("/admin/main")
    public String showMainPage() {
        return "admin/main";
    }

    /*
    @Autowired
    public AdminMainController(AcademyFormRepository academyFormRepository, StudentRepository studentRepository) {
        this.academyFormRepository = academyFormRepository;
        this.studentRepository = studentRepository;
    }

    @GetMapping("/admin/academyForm")
    public String showAcademyFormManagementPage(Model model) {
        List<AcademyFormEntity> academyFormEntities = academyFormRepository.findAll();
        model.addAttribute("학원신청서", academyFormEntities);
        return "admin/academyForm";
    }

    @GetMapping("/admin/student")
    public String showStudentManagementPage(Model model) {
        List<StudentEntity> studentEntities = studentRepository.findAll();
        model.addAttribute("학생", studentEntities);
        return "admin/student";
    }
    */
}
