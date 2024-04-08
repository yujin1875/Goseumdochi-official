package com.midas.goseumdochi.student.Controller;

import com.midas.goseumdochi.student.Component.OtherComponent;
import com.midas.goseumdochi.student.Dto.StudentDTO;
import com.midas.goseumdochi.student.Service.FileStorageService;
import com.midas.goseumdochi.student.Service.StudentService;

import com.midas.goseumdochi.util.Dto.MailDTO;
import com.midas.goseumdochi.util.Service.MailService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;


import java.io.IOException;
import java.util.Optional;


@Controller
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;
    private final FileStorageService fileStorageService;
    private final OtherComponent otherComponent;
    private final MailService mailService;

    // 회원가입 페이지 폼 작성 데이터 받기
    @PostMapping("/student/signup")
    public String join(@ModelAttribute StudentDTO studentDTO, @RequestParam("confirmPassword") String confirmPassword,
                       RedirectAttributes redirectAttributes) {
        System.out.println("StudentController.join");
        System.out.println("studentDTO = " + studentDTO);

        // 전화번호 형식 검증
        String phoneRegex = "^\\d{3}-\\d{4}-\\d{4}$";
        if(!studentDTO.getStudentPhoneNumber().matches(phoneRegex)) {
            // 전화번호 형식이 맞지 않을 경우, 메시지를 RedirectAttributes에 추가
            redirectAttributes.addFlashAttribute("message", "전화번호 형식이 올바르지 않습니다.");
            return "redirect:/signup";    // 리다이렉트를 통해 다시 회원가입 페이지로 이동
        }

        int joinResult = studentService.join(studentDTO, confirmPassword);
        System.out.println(joinResult);

        if (joinResult == -1 || joinResult == -2) {
            // 회원가입 실패 시 메시지를 RedirectAttributes를 사용하여 전달
            redirectAttributes.addFlashAttribute("message", "회원가입 실패!!");
            return "redirect:/signup";
        } else {
            // 회원가입 성공 메시지를 RedirectAttributes를 사용하여 전달
            redirectAttributes.addFlashAttribute("message", "회원가입 성공. 로그인해주세요.");
            return "redirect:/login";
        }
    }

    // 로그인폼 입력 데이터 받고 로직
    @PostMapping("/student/login")
    public String login(@ModelAttribute StudentDTO studentDTO, HttpSession httpSession, HttpServletResponse response) throws IOException {
        StudentDTO loginResult = studentService.login(studentDTO);
        if(loginResult != null) {
            httpSession.setAttribute("loginstudentId", loginResult.getStudentId());
            httpSession.setAttribute("loginId", loginResult.getId());
            httpSession.setAttribute("studentName", loginResult.getStudentName());
            httpSession.setAttribute("studentPhoneNumber", loginResult.getStudentPhoneNumber());
            httpSession.setAttribute("studentBirthDate", loginResult.getStudentBirthDate());


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
    @PostMapping("/student/findStudentId")
    public String findStudentId(@RequestParam("studentName") String studentName,
                             @RequestParam("studentPhoneNumber") String studentPhoneNumber,
                             HttpServletResponse response) throws IOException {
        Optional<String> studentId = studentService.findStudentIdByStudentNameAndPhoneNumber(studentName, studentPhoneNumber);

        if (studentId.isPresent()) {
            // 알림만 표시하고, 사용자가 확인 후 직접 페이지를 이동
            otherComponent.AlertMessage(response, "아이디는 " + studentId.get() + " 입니다.");
        } else {
            otherComponent.AlertMessage(response, "해당 정보와 일치하는 사용자가 없습니다.");
        }
        return null; // 알림만 표시
    }

    // 비밀번호 찾기 처리
    @PostMapping("/student/findStudentPassword")
    public String findStudentPassword(@RequestParam("studentId") String studentId,
                                      @RequestParam("studentName") String studentName,
                                      @RequestParam("studentPhoneNumber") String studentPhoneNumber,
                                      RedirectAttributes redirectAttributes) {
        Optional<StudentDTO> studentOptional = studentService.findStudentByStudentIdAndStudentNameAndPhoneNumber(studentId, studentName, studentPhoneNumber);

        if (studentOptional.isPresent()) {
            // 임시 비밀번호 생성, 업데이트 및 이메일 보내기
            MailDTO dto = mailService.createMailAndChangePassword(studentOptional.get().getStudentEmail(), studentOptional.get().getId());
            mailService.mailSend(dto);

            redirectAttributes.addFlashAttribute("message", "임시 비밀번호가 이메일로 발송되었습니다.");
            return "redirect:/login";
        } else {
            // RedirectAttributes를 사용해 메시지 전달
            redirectAttributes.addFlashAttribute("message", "해당 정보와 일치하는 사용자가 없습니다.");
            return "redirect:/findStudentPassword"; // 사용자가 다시 시도할 수 있는 페이지로 리다이렉션
        }
    }

    // 사용자 정보 수정
    @PostMapping("/student/update")
    public String updateStudent(@ModelAttribute StudentDTO studentDTO, HttpSession session, HttpServletResponse response) throws IOException {
        Long studentId = (Long) session.getAttribute("loginId"); // 로그인 세션에서 사용자 ID 가져오기
        if(studentId == null) {
            otherComponent.AlertMessage(response, "로그인이 필요합니다.");
            return "redirect:/login";
        }

        studentDTO.setId(studentId); // 세션에서 가져온 ID를 DTO에 설정
        int updateResult = studentService.updateStudent(studentDTO);
        if(updateResult == 1) {
            // 업데이트 성공
            return "redirect:/myPage";
        } else {
            // 업데이트 실패
            otherComponent.AlertMessage(response, "정보 수정에 실패하였습니다.");
            return "redirect:/myPage";
        }
    }

    @PostMapping("/student/uploadProfilePicture")
    public String uploadProfilePicture(@RequestParam("profilePicture") MultipartFile file, HttpSession session, HttpServletResponse response) throws IOException {
        Long studentId = (Long) session.getAttribute("loginId");
        if(studentId == null) {
            otherComponent.AlertMessage(response, "로그인이 필요합니다.");
            return "redirect:/login";
        }
        if (file.isEmpty()) {
            otherComponent.AlertMessage(response, "파일이 선택되지 않았습니다.");
            return "redirect:/myPage";
        }
        String imageUrl = fileStorageService.uploadFile(file); // 파일 업로드 서비스 호출

        StudentDTO studentDTO = studentService.findStudentById(studentId);
        if(studentDTO != null) {
            studentDTO.setProfilePictureUrl(imageUrl); // 업로드된 파일 URL 저장
            studentService.updateStudent(studentDTO); // 업데이트 서비스 호출
            return "redirect:/myPage";
        } else {
            otherComponent.AlertMessage(response, "학생 정보를 찾을 수 없습니다.");
            return "redirect:/myPage";
        }
    }

}
