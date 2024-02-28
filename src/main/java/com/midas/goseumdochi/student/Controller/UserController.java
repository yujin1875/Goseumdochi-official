package com.midas.goseumdochi.student.Controller;

import com.midas.goseumdochi.student.Component.OtherComponent;
import com.midas.goseumdochi.student.Dto.UserDTO;
import com.midas.goseumdochi.student.Service.UserService;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Optional;


@Controller
@RequiredArgsConstructor
public class UserController {

    public final UserService userService;
    private final OtherComponent otherComponent;

    // 회원가입 페이지 폼 작성 데이터 받기
    @PostMapping("/user/signup")
    public String join(@ModelAttribute UserDTO userDTO, @RequestParam("confirmPassword") String confirmPassword,
                       HttpServletResponse response) throws IOException {
        System.out.println("UserController.join");
        System.out.println("userDTO = " + userDTO);

        // 전화번호 형식 검증
        String phoneRegex = "^\\d{3}-\\d{4}-\\d{4}$";
        if(!userDTO.getUserPhoneNumber().matches(phoneRegex)) {
            // 전화번호 형식이 맞지 않을 경우
            otherComponent.AlertMessage(response, "전화번호 형식이 올바르지 않습니다.");
            return "signup";    // 다시 회원가입 페이지로 이동
        }

        int joinResult = userService.join(userDTO, confirmPassword);
        System.out.println(joinResult);

        if (joinResult == -1 || joinResult == -2) {
            otherComponent.AlertMessage(response, "회원가입 실패!!");
            return "signup"; // 회원가입 실패 시 다시 회원가입 페이지로 이동
        } else {
            return "redirect:/login"; // 회원가입 후 로그인 페이지로 이동
        }
    }

    // 로그인폼 입력 데이터 받고 로직
    @PostMapping("/user/login")
    public String login(@ModelAttribute UserDTO userDTO, HttpSession httpSession, HttpServletResponse response) throws IOException {
        UserDTO loginResult = userService.login(userDTO);
        if(loginResult != null) {
            httpSession.setAttribute("loginuserId", loginResult.getUserId());
            httpSession.setAttribute("loginId", loginResult.getId());
            httpSession.setAttribute("userName", loginResult.getUserName());
            httpSession.setAttribute("userPhoneNumber", loginResult.getUserPhoneNumber());
            httpSession.setAttribute("userBirthDate", loginResult.getUserBirthDate());


            httpSession.setAttribute("category", "total"); // 메인페이지 카테고리 total
            return "redirect:/main";
        }
        else {
            //로그인 실패
            otherComponent.AlertMessage(response, "로그인 실패!!");
            return "login";
        }
    }

    // 아이디 찾기 처리
    @PostMapping("/user/findUserId")
    public String findUserId(@RequestParam("userName") String userName,
                             @RequestParam("userPhoneNumber") String userPhoneNumber,
                             HttpServletResponse response) throws IOException {
        Optional<String> userId = userService.findUserIdByUserNameAndPhoneNumber(userName, userPhoneNumber);

        if (userId.isPresent()) {
            // 알림만 표시하고, 사용자가 확인 후 직접 페이지를 이동
            otherComponent.AlertMessage(response, "아이디는 " + userId.get() + " 입니다.");
        } else {
            otherComponent.AlertMessage(response, "해당 정보와 일치하는 사용자가 없습니다.");
        }
        return null; // 알림만 표시
    }

    // 비밀번호 찾기 처리
    @PostMapping("/user/findUserPassword")
    public String findUserPassword(@RequestParam("userId") String userId,
                                   @RequestParam("userName") String userName,
                                   @RequestParam("userPhoneNumber") String userPhoneNumber,
                                   HttpServletResponse response) throws IOException {
        Optional<String> userPassword = userService.findUserPasswordByUserIdAndUserNameAndPhoneNumber(userId, userName, userPhoneNumber);

        if (userPassword.isPresent()) {
            // 보안상의 이유로 비밀번호를 직접 표시하지 않음? -> 나중에 휴대폰 인증하면 거기로 보내는 걸로 수정 or 비밀번호재설정
            otherComponent.AlertMessage(response, "귀하의 정보로 비밀번호를 재설정해주세요.");
        } else {
            otherComponent.AlertMessage(response, "해당 정보와 일치하는 사용자가 없습니다.");
        }
        return null; // 알림만 표시
    }

    // 사용자 정보 수정
    @PostMapping("/user/update")
    public String updateUser(@ModelAttribute UserDTO userDTO, HttpSession session, HttpServletResponse response) throws IOException {
        Long userId = (Long) session.getAttribute("loginId"); // 로그인 세션에서 사용자 ID 가져오기
        if(userId == null) {
            otherComponent.AlertMessage(response, "로그인이 필요합니다.");
            return "redirect:/login";
        }

        userDTO.setId(userId); // 세션에서 가져온 ID를 DTO에 설정
        int updateResult = userService.updateUser(userDTO);
        if(updateResult == 1) {
            // 업데이트 성공
            return "redirect:/myPage";
        } else {
            // 업데이트 실패
            otherComponent.AlertMessage(response, "정보 수정에 실패하였습니다.");
            return "redirect:/myPage";
        }
    }


}
