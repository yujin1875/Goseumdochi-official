package com.midas.goseumdochi.academy.controller;

import com.midas.goseumdochi.academy.service.NoticeService;
import com.midas.goseumdochi.director.entity.DirectorNoticeEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/academyNotice")
public class NoticeController {

    @Autowired
    private NoticeService noticeService;

    @GetMapping("/student/{studentId}")
    public List<Map<String, Object>> getNoticesByStudentId(@PathVariable Long studentId) {
        System.out.println(("Notice Controller studentID: " + studentId));
        // 학생 ID로 공지사항을 조회하는 서비스 호출
        return noticeService.getNoticesByStudentId(studentId);
    }
}

