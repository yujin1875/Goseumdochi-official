package com.midas.goseumdochi.teacher.controller;

import com.midas.goseumdochi.teacher.dto.TeacherDTO;
import com.midas.goseumdochi.teacher.service.TeacherService;
import com.midas.goseumdochi.util.Service.MailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/teacher")
@RequiredArgsConstructor
public class TeacherController {
    final private TeacherService teacherService;
    final private MailService mailService;

    @PostMapping("/regist")
    public ResponseEntity<?> registTeacher(@RequestBody TeacherDTO inputTeacherDTO) { // id, loginid랑 password 빼고 전달받음
        TeacherDTO teacherDTO = teacherService.setLoginidAndPassword(inputTeacherDTO);
        teacherService.regist(teacherDTO);

        // 선생 등록 성공
        mailService.mailSend(teacherService.getMailDTOForRegist(teacherDTO)); // 원장에게 메일 전송

        return ResponseEntity.ok(teacherDTO); // 선생 dto 리턴
    }

}
