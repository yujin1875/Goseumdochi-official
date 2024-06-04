package com.midas.goseumdochi.community.service;

import com.midas.goseumdochi.academy.entity.AcademyEntity;
import com.midas.goseumdochi.community.dto.AcademyReviewDTO;
import com.midas.goseumdochi.community.entity.AcademyReviewEntity;
import com.midas.goseumdochi.community.repository.AcademyReviewRepository;
import com.midas.goseumdochi.student.Repository.StudentRepository;
import com.midas.goseumdochi.student.entity.StudentEntity;
import com.midas.goseumdochi.academy.repository.AcademyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AcademyReviewService {
    @Autowired
    private AcademyReviewRepository academyReviewRepository;

    @Autowired
    private AcademyRepository academyRepository;

    @Autowired
    private StudentRepository studentRepository;

    public AcademyReviewDTO createReview(AcademyReviewDTO reviewDTO) {
        AcademyReviewEntity reviewEntity = new AcademyReviewEntity();
        reviewEntity.setTitle(reviewDTO.getTitle());
        reviewEntity.setContent(reviewDTO.getContent());
        reviewEntity.setViews(0);
        reviewEntity.setLikeCount(0);
        reviewEntity.setStar(reviewDTO.getStar());

        StudentEntity writer = studentRepository.findById(reviewDTO.getWriterId()).orElseThrow(() -> new IllegalArgumentException("Invalid writer ID"));
        AcademyEntity academy = academyRepository.findById(reviewDTO.getAcademyId()).orElseThrow(() -> new IllegalArgumentException("Invalid academy ID"));

        reviewEntity.setWriter(writer);
        reviewEntity.setAcademy(academy);

        academyReviewRepository.save(reviewEntity);

        reviewDTO.setId(reviewEntity.getId());
        reviewDTO.setCreateDate(reviewEntity.getCreateDate());
        return reviewDTO;
    }

    public List<AcademyReviewDTO> getAllReviews() {
        return academyReviewRepository.findAll().stream().map(reviewEntity -> {
            AcademyReviewDTO reviewDTO = new AcademyReviewDTO();
            reviewDTO.setId(reviewEntity.getId());
            reviewDTO.setTitle(reviewEntity.getTitle());
            reviewDTO.setContent(reviewEntity.getContent());
            reviewDTO.setCreateDate(reviewEntity.getCreateDate());
            reviewDTO.setViews(reviewEntity.getViews());
            reviewDTO.setLikeCount(reviewEntity.getLikeCount());
            reviewDTO.setStar(reviewEntity.getStar());
            reviewDTO.setWriterId(reviewEntity.getWriter().getId());
            reviewDTO.setAcademyId(reviewEntity.getAcademy().getId());
            return reviewDTO;
        }).collect(Collectors.toList());
    }
}
