package com.midas.goseumdochi.community.service;

import com.midas.goseumdochi.academy.entity.AcademyEntity;
import com.midas.goseumdochi.community.dto.AcademyReviewDTO;
import com.midas.goseumdochi.community.entity.AcademyReviewEntity;
import com.midas.goseumdochi.community.repository.AcademyReviewRepository;
import com.midas.goseumdochi.academy.repository.AcademyRepository;
import com.midas.goseumdochi.student.Repository.StudentRepository;
import com.midas.goseumdochi.student.entity.StudentEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AcademyReviewService {
    private final AcademyReviewRepository academyReviewRepository;
    private final AcademyRepository academyRepository;
    private final StudentRepository studentRepository;

    @Autowired
    public AcademyReviewService(AcademyReviewRepository academyReviewRepository,
                                AcademyRepository academyRepository,
                                StudentRepository studentRepository) {
        this.academyReviewRepository = academyReviewRepository;
        this.academyRepository = academyRepository;
        this.studentRepository = studentRepository;
    }

    public AcademyReviewDTO createReview(AcademyReviewDTO reviewDTO) {
        // DTO를 엔티티로 변환
        AcademyReviewEntity reviewEntity = mapToEntity(reviewDTO);

        // 학생과 학원 엔티티 찾기
        StudentEntity writer = studentRepository.findById(reviewDTO.getWriterId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid writer ID"));
        AcademyEntity academy = academyRepository.findById(reviewDTO.getAcademyId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid academy ID"));

        // 엔티티에 학생과 학원 설정
        reviewEntity.setWriter(writer);
        reviewEntity.setAcademy(academy);

        // 리뷰 저장
        AcademyReviewEntity savedReviewEntity = academyReviewRepository.save(reviewEntity);

        // 저장된 엔티티를 DTO로 변환하여 반환
        return mapToDTO(savedReviewEntity);
    }


    // DTO를 Entity로 변환하는 메서드 추가
    private AcademyReviewEntity mapToEntity(AcademyReviewDTO reviewDTO) {
        AcademyReviewEntity reviewEntity = new AcademyReviewEntity();
        reviewEntity.setTitle(reviewDTO.getTitle());
        reviewEntity.setContent(reviewDTO.getContent());
        reviewEntity.setViews(0);
        reviewEntity.setLikeCount(0);
        reviewEntity.setStar(reviewDTO.getStar());
        return reviewEntity;
    }


    public List<AcademyReviewDTO> getAllReviews() {
        return academyReviewRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // Entity를 DTO로 변환하는 메서드
    private AcademyReviewDTO mapToDTO(AcademyReviewEntity reviewEntity) {
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
    }
}

