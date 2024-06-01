package com.midas.goseumdochi.teacher.repository;

import com.midas.goseumdochi.teacher.entity.SubjectNoticeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubjectNoticeRepository extends JpaRepository<SubjectNoticeEntity, Long> {
}
