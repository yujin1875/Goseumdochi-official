package com.midas.goseumdochi.community.controller;

import com.midas.goseumdochi.util.ai.BadwordDTO;
import com.midas.goseumdochi.util.ai.BadwordService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/api/badword")
public class BadWordController {

    private final BadwordService badwordService;

    public BadWordController(BadwordService badwordService) {
        this.badwordService = badwordService;
    }

    @GetMapping("/check")
    public ResponseEntity<?> recommendUniv(@RequestParam String text) {
        BadwordDTO badword = badwordService.classify(text);
        return ResponseEntity.ok(badword);
    }
}
