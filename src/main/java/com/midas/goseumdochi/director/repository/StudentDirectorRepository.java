package com.midas.goseumdochi.director.repository;

import com.midas.goseumdochi.director.entity.StudentDirectorEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentDirectorRepository extends JpaRepository<StudentDirectorEntity, Long> {
}
