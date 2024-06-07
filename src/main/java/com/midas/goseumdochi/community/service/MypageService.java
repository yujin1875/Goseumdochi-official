package com.midas.goseumdochi.community.service;

import com.midas.goseumdochi.community.dto.PostDTO;
import com.midas.goseumdochi.community.dto.CommentDTO;
import com.midas.goseumdochi.community.entity.PostEntity;
import com.midas.goseumdochi.community.entity.CommentEntity;
import com.midas.goseumdochi.community.entity.PostLikeEntity;
import com.midas.goseumdochi.community.repository.PostLikeRepository;
import com.midas.goseumdochi.community.repository.PostRepository;
import com.midas.goseumdochi.community.repository.CommentRepository;
import com.midas.goseumdochi.student.entity.StudentEntity;
import com.midas.goseumdochi.student.Repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MypageService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private PostLikeRepository postLikeRepository;

    @Autowired
    private CommentRepository commentRepository;

    public List<PostDTO> getPostsByWriterId(Long writerId) {
        return postRepository.findByWriterId(writerId).stream()
                .map(this::convertPostToDTO)
                .collect(Collectors.toList());
    }

    public List<PostDTO> getLikedPostsByWriterId(Long writerId) {
        List<PostLikeEntity> likedPosts = postLikeRepository.findByStudentId(writerId);

        return likedPosts.stream()
                .map(PostLikeEntity::getPost)
                .map(this::convertPostToDTO)
                .collect(Collectors.toList());
    }


    public List<PostDTO> getCommentedPostsByWriterId(Long writerId) {
        return commentRepository.findByWriterId(writerId).stream()
                .map(CommentEntity::getPost) // 댓글이 달린 게시글을 가져옴
                .distinct() // 중복된 게시글을 제거
                .map(this::convertPostToDTO) // 게시글 엔티티를 DTO로 변환
                .collect(Collectors.toList());
    }
    private PostDTO convertPostToDTO(PostEntity postEntity) {
        return PostDTO.builder()
                .id(postEntity.getId())
                .title(postEntity.getTitle())
                .content(postEntity.getContent())
                .createDate(postEntity.getCreateDate())
                .views(postEntity.getViews())
                .likeCount(postEntity.getLikeCount())
                .writerId(postEntity.getWriter().getId())
                .categoryId((long) postEntity.getCategory().getId())
                .isModified(postEntity.isModified())
                .build();
    }

    private CommentDTO convertCommentToDTO(CommentEntity commentEntity) {
        return CommentDTO.builder()
                .id(commentEntity.getId())
                .text(commentEntity.getText())
                .createDate(commentEntity.getCreateDate())
                .writerId(commentEntity.getWriter().getId())
                .postId(commentEntity.getPost().getId())
                .build();
    }
}
