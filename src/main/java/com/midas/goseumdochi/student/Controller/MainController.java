package com.midas.goseumdochi.student.Controller;

import com.midas.goseumdochi.student.entity.StudentEntity;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import com.midas.goseumdochi.student.Dto.StudentDTO;
import com.midas.goseumdochi.student.Repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

@Controller
public class MainController {

    private final StudentRepository studentRepository;

    @Autowired
    public MainController(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @GetMapping("/")
    public String indexPage() {
        return "index";
    }

    @GetMapping("/signup")
    public String signUpPage(@ModelAttribute("student") StudentEntity studentEntity) {
        return "signup";
    }

    @PostMapping("/signup")
    public String signUp(@ModelAttribute("student") StudentEntity studentEntity) {
        return "redirect:/login";
    }

    @GetMapping("/login")
    public String loginPage() {
        return "login";
    }

    @GetMapping("/main")
    public String mainPage() {
        return "main";
    }

    @GetMapping("/findStudentId")
    public String findStudentIdPage() { return "/findStudentId"; // 아이디 찾기 페이지로 이동
    }

    @GetMapping("/findStudentPassword")
    public String findStudentPasswordPageIn() {
        return "/findStudentPassword"; // 비밀번호 찾기 페이지로 이동
    }

    @GetMapping("/lecture-portal")
    public String lecturePortal() {
        return "/lecture-portal"; // 강의포털 페이지로 이동
    }

    @GetMapping("/myPage")
    public String myPage(HttpSession session, Model model) {
        Long studentId = (Long) session.getAttribute("loginId");
        if(studentId == null) {
            return "redirect:/login"; // 로그인되지 않았다면 로그인 페이지로 리다이렉트
        }
        // DB에서 사용자 정보 조회
        Optional<StudentEntity> studentEntity = studentRepository.findById(studentId);
        studentEntity.ifPresent(entity -> model.addAttribute("student", StudentDTO.toStudentDTO(entity)));

        // 세션에서 사용자 정보 가져오기
        String studentName = (String) session.getAttribute("studentName");
        String studentPhoneNumber = (String) session.getAttribute("studentPhoneNumber");
        String studentBirthDate = (String) session.getAttribute("studentBirthDate");

        // 모델에 사용자 정보 추가
        model.addAttribute("studentName", studentName);
        model.addAttribute("studentPhoneNumber", studentPhoneNumber);
        model.addAttribute("studentBirthDate", studentBirthDate);

        return "/myPage"; // 마이페이지로 이동
    }
}
