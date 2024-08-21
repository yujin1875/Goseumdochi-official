package com.midas.goseumdochi.academy.repository;

import com.midas.goseumdochi.academy.entity.StudentAcademyEntity;
import com.midas.goseumdochi.student.entity.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentAcademyRepository extends JpaRepository<StudentAcademyEntity, Long> {
    @Query("SELECT sa.studentEntity FROM StudentAcademyEntity sa WHERE sa.academyEntity.id = :academyId")
    List<StudentEntity> findAllStudentByAcademyId(@Param("academyId") Long academyId);

    @Query("SELECT sa FROM StudentAcademyEntity sa WHERE sa.studentEntity.id = :studentId and sa.academyEntity.id = :academyId")
    Optional<StudentAcademyEntity> findByStudentIdAndAcademyId(@Param("studentId") Long studentId, @Param("academyId") Long academyId);

    List<StudentAcademyEntity> findByStudentEntityId(Long studentId);

    @Query("SELECT a.name FROM StudentAcademyEntity sa JOIN sa.academyEntity a WHERE sa.studentEntity.id = :studentId")
    List<String> findAcademyNamesByStudentId(@Param("studentId") Long studentId);
}
