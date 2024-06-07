package com.midas.goseumdochi.admin.repository;

import com.midas.goseumdochi.admin.entity.AdminEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<AdminEntity, Integer> {
    AdminEntity findById(String id); // 사용자의 아이디로 관리자 찾기
}
