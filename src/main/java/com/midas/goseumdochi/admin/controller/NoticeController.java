package com.midas.goseumdochi.admin.controller;

import com.midas.goseumdochi.admin.entity.NoticeEntity;
import com.midas.goseumdochi.admin.repository.NoticeRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.sql.Date;
import java.util.List;

@Controller
public class NoticeController {

    private final NoticeRepository noticeRepository;

    @Autowired
    public NoticeController(NoticeRepository noticeRepository) {
        this.noticeRepository = noticeRepository;
    }

    @Autowired
    private HttpSession httpSession;

    private boolean isLoggedIn() {
        // 세션에서 관리자 ID를 가져와서 확인합니다.
        return httpSession.getAttribute("adminId") != null;
    }

    @GetMapping("/admin/noticeList")
    public String showNoticeList(Model model) {
        // 로그인 상태를 확인하고, 로그인되지 않은 경우 로그인 페이지로 ㄱㄱ
        if (!isLoggedIn()) {
            return "admin/login";
        }

        List<NoticeEntity> noticeEntities = noticeRepository.findAll();
        model.addAttribute("noticeEntities", noticeEntities);

        return "admin/noticeList";
    }

    @GetMapping("/admin/noticeForm")
    public String shoNoticeForm(Model model) {
        // 로그인 상태를 확인하고, 로그인되지 않은 경우 로그인 페이지로 ㄱㄱ
        if (!isLoggedIn()) {
            return "admin/login";
        }
        return "admin/noticeForm";
    }

    @PostMapping("/admin/noticeForm")
    public String addNotice(@RequestParam("title") String title,
                            @RequestParam("content") String content) {
        // 로그인 상태를 확인하고, 로그인되지 않은 경우 로그인 페이지로 ㄱㄱ
        if (!isLoggedIn()) {
            return "admin/login";
        }

        // 현재 로그인된 관리자의 ID를 작성자로 저장
        String writer = (String) httpSession.getAttribute("adminId");

        // 현재 날짜를 생성 후 공지사항에 등록
        Date regdate = new Date(System.currentTimeMillis());

        // 공지사항을 저장
        NoticeEntity notice = new NoticeEntity();
        notice.setTitle(title);
        notice.setContent(content);
        notice.setRegdate(regdate);
        notice.setWriter(writer);

        noticeRepository.save(notice);

        // 공지사항 등록 후, 공지사항 목록 페이지로 이동
        return "redirect:/admin/noticeList";
    }
}
