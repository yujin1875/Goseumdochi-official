package com.midas.goseumdochi.academy.repository;

import com.midas.goseumdochi.academy.entity.AcademyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface AcademyRepository extends JpaRepository<AcademyEntity, Long> {

    @Query("SELECT a.id FROM AcademyEntity a WHERE a.name = :academyName")
    Optional<Long> findIdByName(@Param("academyName") String academyName);

    @Query("SELECT a.name FROM AcademyEntity a WHERE a.id = :academyId")
    Optional<String> findNameById(@Param("academyId") Long academyId);
}
