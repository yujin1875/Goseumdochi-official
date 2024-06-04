package com.midas.goseumdochi.community.controller;

import com.midas.goseumdochi.community.dto.AcademyReviewDTO;
import com.midas.goseumdochi.community.service.AcademyReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/academy-reviews")
public class AcademyReviewController {

    @Autowired
    private AcademyReviewService academyReviewService;

    @PostMapping
    public ResponseEntity<AcademyReviewDTO> createReview(@RequestBody AcademyReviewDTO reviewDTO) {
        AcademyReviewDTO createdReview = academyReviewService.createReview(reviewDTO);
        return ResponseEntity.ok(createdReview);
    }

    @GetMapping
    public ResponseEntity<List<AcademyReviewDTO>> getAllReviews() {
        List<AcademyReviewDTO> reviews = academyReviewService.getAllReviews();
        return ResponseEntity.ok(reviews);
    }


}
