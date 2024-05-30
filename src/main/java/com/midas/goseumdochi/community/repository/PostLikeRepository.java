package com.midas.goseumdochi.community.repository;

import com.midas.goseumdochi.community.entity.PostLikeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostLikeRepository extends JpaRepository<PostLikeEntity, Long> {
}
