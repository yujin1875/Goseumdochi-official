package com.midas.goseumdochi.community.repository;

import com.midas.goseumdochi.community.entity.CategoryEntity;
import com.midas.goseumdochi.community.entity.PostEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<PostEntity, Long> {
    List<PostEntity> findByLikeCountGreaterThanEqual(int likeCount);
    List<PostEntity> findByWriterId(Long writerId);
    List<PostEntity> findByCategory(CategoryEntity category);
}
