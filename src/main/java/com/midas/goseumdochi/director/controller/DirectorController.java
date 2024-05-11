package com.midas.goseumdochi.director.controller;


import com.midas.goseumdochi.director.dto.DirectorDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.midas.goseumdochi.director.service.DirectorService;


@RestController
@RequestMapping("/api/director")
@RequiredArgsConstructor
public class DirectorController {
    private final DirectorService directorService;

    // 로그인 폼 작성 후
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String directorLoginid, @RequestParam String directorPassword) {
        DirectorDTO directorDTO = directorService.findDirector(directorLoginid, directorPassword);

        if(directorDTO == null) { // 로그인 실패
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("원장 로그인 실패");
        }
        // 로그인 성공
        return ResponseEntity.ok(directorDTO.getId()); // 원장 id 리턴
    }
}