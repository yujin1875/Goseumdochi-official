package com.midas.goseumdochi.student.Controller;

import com.midas.goseumdochi.student.entity.UserEntity;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import com.midas.goseumdochi.student.Dto.UserDTO;
import com.midas.goseumdochi.student.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

@Controller
public class MainController {

    private final UserRepository userRepository;

    @Autowired
    public MainController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/")
    public String indexPage() {
        return "index";
    }

    @GetMapping("/signup")
    public String signUpPage(@ModelAttribute("user") UserEntity userEntity) {
        return "signup";
    }
    @PostMapping("/signup")
    public String signUp(@ModelAttribute("user") UserEntity userEntity) {
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

    @GetMapping("/findUserId")
    public String findUserIdPage() { return "findUserId"; // 아이디 찾기 페이지로 이동
    }

    @GetMapping("/findUserPassword")
    public String findUserPasswordPageIn() {
        return "findUserPassword"; // 비밀번호 찾기 페이지로 이동
    }

    @GetMapping("/lecture-portal")
    public String lecturePortal() {
        return "lecture-portal"; // 강의포털 페이지로 이동
    }

    @GetMapping("/myPage")
    public String myPage(HttpSession session, Model model) {
        Long userId = (Long) session.getAttribute("loginId");
        if(userId == null) {
            return "redirect:/login"; // 로그인되지 않았다면 로그인 페이지로 리다이렉트
        }
        // DB에서 사용자 정보 조회
        Optional<UserEntity> userEntity = userRepository.findById(userId);
        userEntity.ifPresent(entity -> model.addAttribute("user", UserDTO.toUserDTO(entity)));

        // 세션에서 사용자 정보 가져오기
        String userName = (String) session.getAttribute("userName");
        String userPhoneNumber = (String) session.getAttribute("userPhoneNumber");
        String userBirthDate = (String) session.getAttribute("userBirthDate");

        // 모델에 사용자 정보 추가
        model.addAttribute("userName", userName);
        model.addAttribute("userPhoneNumber", userPhoneNumber);
        model.addAttribute("userBirthDate", userBirthDate);

        return "myPage"; // 마이페이지로 이동
    }
}
