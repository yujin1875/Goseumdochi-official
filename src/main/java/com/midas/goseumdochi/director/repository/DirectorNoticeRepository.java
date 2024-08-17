package com.midas.goseumdochi.director.repository;

import com.midas.goseumdochi.director.entity.DirectorNoticeEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DirectorNoticeRepository extends JpaRepository<DirectorNoticeEntity, Integer> {
    // 원장 공지사항 페이징
    @Query("SELECT d FROM DirectorNoticeEntity d WHERE d.directorEntity.id = :directorId")
    Page<DirectorNoticeEntity> findAllByDirectorId(@Param("directorId") Long directorId, Pageable pageable);

    List<DirectorNoticeEntity> findByDirectorEntityId(Long directorId);  // 원장 ID로 공지사항 조회
}