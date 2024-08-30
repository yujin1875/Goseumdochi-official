package com.midas.goseumdochi.academy.repository;

import com.midas.goseumdochi.academy.entity.MessageEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends JpaRepository<MessageEntity, Long> {
    // 선생 받은쪽지 페이징 조회
    @Query("SELECT m FROM MessageEntity m WHERE m.teacherEntity.id = :teacherId and m.sender = 'S' and m.deleteByTeacher = 'N'")
    Page<MessageEntity> findAllReceiveByTeacherId(@Param("teacherId") Long teacherId, Pageable pageable);

    // 선생 보낸쪽지 페이징 조회
    @Query("SELECT m FROM MessageEntity m WHERE m.teacherEntity.id = :teacherId and m.sender = 'T' and m.deleteByTeacher = 'N'")
    Page<MessageEntity> findAllSendByTeacherId(@Param("teacherId") Long teacherId, Pageable pageable);

    // 학생 받은쪽지 페이징 조회
    @Query("SELECT m FROM MessageEntity m WHERE m.studentEntity.id = :studentId and m.sender = 'T' and m.deleteByStudent = 'N'")
    Page<MessageEntity> findAllReceiveByStudentId(@Param("studentId") Long studentId, Pageable pageable);

    // 학생 보낸쪽지 페이징 조회
    @Query("SELECT m FROM MessageEntity m WHERE m.studentEntity.id = :studentId and m.sender = 'S' and m.deleteByStudent = 'N'")
    Page<MessageEntity> findAllSendByStudentId(@Param("studentId") Long studentId, Pageable pageable);
}
