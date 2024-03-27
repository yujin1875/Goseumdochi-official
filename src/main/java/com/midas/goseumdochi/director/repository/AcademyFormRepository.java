package com.midas.goseumdochi.director.repository;

import com.midas.goseumdochi.director.entity.AcademyFormEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AcademyFormRepository extends JpaRepository<AcademyFormEntity, Long> {
}
