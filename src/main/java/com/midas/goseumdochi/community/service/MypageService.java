package com.midas.goseumdochi.community.service;

import com.midas.goseumdochi.community.dto.PostDTO;
import com.midas.goseumdochi.community.dto.CommentDTO;
import com.midas.goseumdochi.community.entity.PostEntity;
import com.midas.goseumdochi.community.entity.CommentEntity;
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
    private CommentRepository commentRepository;

    public List<PostDTO> getPostsByWriterId(Long writerId) {
        return postRepository.findByWriterId(writerId).stream()
                .map(this::convertPostToDTO)
                .collect(Collectors.toList());
    }

    public List<PostDTO> getLikedPostsByWriterId(Long writerId) {
        StudentEntity writer = studentRepository.findById(writerId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid writer ID"));

        return writer.getLikedPosts().stream()
                .map(this::convertPostToDTO)
                .collect(Collectors.toList());
    }

    public List<CommentDTO> getCommentsByWriterId(Long writerId) {
        return commentRepository.findByWriterId(writerId).stream()
                .map(this::convertCommentToDTO)
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
