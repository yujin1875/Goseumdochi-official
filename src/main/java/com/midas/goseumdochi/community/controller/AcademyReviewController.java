package com.midas.goseumdochi.community.controller;

import com.midas.goseumdochi.community.dto.AcademyReviewDTO;
import com.midas.goseumdochi.community.service.AcademyReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/academy-reviews")
@RequiredArgsConstructor
public class AcademyReviewController {

    private final AcademyReviewService academyReviewService;

    // 리뷰 생성 엔드포인트
    @PostMapping
    public ResponseEntity<AcademyReviewDTO> createReview(@RequestBody AcademyReviewDTO reviewDTO) {
        AcademyReviewDTO createdReview = academyReviewService.createReview(reviewDTO);
        return ResponseEntity.ok(createdReview);
    }

    // 모든 리뷰를 가져오는 엔드포인트
    @GetMapping
    public ResponseEntity<List<AcademyReviewDTO>> getAllReviews() {
        List<AcademyReviewDTO> reviews = academyReviewService.getAllReviews();
        return ResponseEntity.ok(reviews);
    }
}
