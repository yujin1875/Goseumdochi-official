package com.midas.goseumdochi.community.service;

import com.midas.goseumdochi.community.dto.CommentDTO;
import com.midas.goseumdochi.community.entity.CommentEntity;
import com.midas.goseumdochi.community.entity.PostEntity;
import com.midas.goseumdochi.community.repository.CommentRepository;
import com.midas.goseumdochi.community.repository.PostRepository;
import com.midas.goseumdochi.student.Repository.StudentRepository;
import com.midas.goseumdochi.student.entity.StudentEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private StudentRepository studentRepository;

    public CommentDTO addComment(CommentDTO commentDTO) {
        PostEntity post = postRepository.findById(commentDTO.getPostId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid post ID"));

        StudentEntity writer = studentRepository.findById(commentDTO.getWriterId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid writer ID"));

        CommentEntity commentEntity = CommentEntity.builder()
                .text(commentDTO.getText())
                .post(post)
                .writer(writer)
                .build();

        commentRepository.save(commentEntity);

        return convertToDTO(commentEntity);
    }

    public List<CommentDTO> getCommentsByPostId(Long postId) {
        return commentRepository.findByPostId(postId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private CommentDTO convertToDTO(CommentEntity commentEntity) {
        return CommentDTO.builder()
                .id(commentEntity.getId())
                .text(commentEntity.getText())
                .createDate(commentEntity.getCreateDate())
                .writerId(commentEntity.getWriter().getId())
                .postId(commentEntity.getPost().getId())
                .build();
    }
}
