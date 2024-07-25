package com.midas.goseumdochi.community.repository;

import com.midas.goseumdochi.community.entity.PostEntity;
import com.midas.goseumdochi.community.entity.PostLikeEntity;
import com.midas.goseumdochi.student.entity.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PostLikeRepository extends JpaRepository<PostLikeEntity, Long> {
    List<PostLikeEntity> findByStudentId(Long writerId);
    boolean existsByPostAndStudent(PostEntity post, StudentEntity student);
    Optional<PostLikeEntity> findByPostAndStudent(PostEntity post, StudentEntity student);
}
