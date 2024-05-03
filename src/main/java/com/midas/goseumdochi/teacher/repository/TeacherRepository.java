package com.midas.goseumdochi.teacher.repository;

import com.midas.goseumdochi.teacher.entity.TeacherEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeacherRepository extends JpaRepository<TeacherEntity, Long> {
    @Query("SELECT t FROM TeacherEntity t WHERE t.directorEntity.id = :directorId")
    List<TeacherEntity> findAllByDirectorId(@Param("directorId") Long directorId);
}
