package com.midas.goseumdochi.community.repository;

import com.midas.goseumdochi.community.entity.AcademyReviewEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AcademyReviewRepository extends JpaRepository<AcademyReviewEntity, Long> {
}
