package com.midas.goseumdochi.academy.repository;

import com.midas.goseumdochi.academy.entity.StudentAcademyEntity;
import com.midas.goseumdochi.student.entity.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentAcademyRepository extends JpaRepository<StudentAcademyEntity, Long> {
    @Query("SELECT sa FROM StudentAcademyEntity sa WHERE sa.academyEntity.id = :academyId")
    List<StudentEntity> findAllStudentByAcademyId(@Param("academyId") Long academyId);
}
