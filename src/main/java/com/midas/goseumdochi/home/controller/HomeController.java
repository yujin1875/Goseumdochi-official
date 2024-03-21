package com.midas.goseumdochi.home.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

// 대표 컨트롤러 (시작 컨트롤러)
@Controller
public class HomeController {
    // 시작 페이지 요청
    @GetMapping("/")
    public String index() {
        return "home/first";
    }
}
