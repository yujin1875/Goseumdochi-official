package com.midas.goseumdochi.community.service;

import com.midas.goseumdochi.community.dto.CommentDTO;
import com.midas.goseumdochi.community.dto.PostDTO;
import com.midas.goseumdochi.community.entity.CategoryEntity;
import com.midas.goseumdochi.community.entity.CommentEntity;
import com.midas.goseumdochi.community.entity.PostEntity;
import com.midas.goseumdochi.community.repository.CategoryRepository;
import com.midas.goseumdochi.community.repository.CommentRepository;
import com.midas.goseumdochi.community.repository.PostRepository;
import com.midas.goseumdochi.student.Repository.StudentRepository;
import com.midas.goseumdochi.student.entity.StudentEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public PostDTO createPost(PostDTO postDTO) {
        StudentEntity writer = studentRepository.findById(postDTO.getWriterId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid writer ID"));

        CategoryEntity category = categoryRepository.findById(postDTO.getCategoryId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid category ID"));

        PostEntity postEntity = PostEntity.builder()
                .title(postDTO.getTitle())
                .content(postDTO.getContent())
                .createDate(postDTO.getCreateDate())
                .views(postDTO.getViews())
                .likeCount(postDTO.getLikeCount())
                .writer(writer)
                .category(category)
                .isModified(postDTO.isModified()) // Set the modified status
                .build();

        postRepository.save(postEntity);

        return convertToDTO(postEntity);
    }

    public List<PostDTO> getAllPosts() {
        return postRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public PostDTO getPostById(Long id) {
        PostEntity postEntity = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Post not found"));
        return convertToDTO(postEntity);
    }

    private PostDTO convertToDTO(PostEntity postEntity) {
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

    public PostDTO updatePost(Long id, PostDTO postDTO) {
        PostEntity postEntity = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Post not found"));

        CategoryEntity category = categoryRepository.findById(postDTO.getCategoryId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid category ID"));

        postEntity.setTitle(postDTO.getTitle());
        postEntity.setContent(postDTO.getContent());
        postEntity.setCategory(category);
        postEntity.setModified(true);
        postEntity.setCreateDate(LocalDateTime.now());

        postRepository.save(postEntity);

        return convertToDTO(postEntity);
    }

    // Hot게시물 찾기 위함
    public List<PostDTO> getPostsByMinimumLikes(int minimumLikes) {
        return postRepository.findByLikeCountGreaterThanEqual(minimumLikes).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // 댓글 기능

    @Autowired
    private CommentRepository commentRepository;

    public PostDTO getPostByIdWithComments(Long id) {
        PostEntity postEntity = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Post not found"));

        List<CommentDTO> comments = commentRepository.findByPostId(id).stream()
                .map(this::convertToCommentDTO)
                .collect(Collectors.toList());

        PostDTO postDTO = convertToDTO(postEntity);
        postDTO.setComments(comments);

        return postDTO;
    }

    private CommentDTO convertToCommentDTO(CommentEntity commentEntity) {
        return CommentDTO.builder()
                .id(commentEntity.getId())
                .text(commentEntity.getText())
                .createDate(commentEntity.getCreateDate())
                .writerId(commentEntity.getWriter().getId())
                .postId(commentEntity.getPost().getId())
                .build();
    }

    // 카테고리별 게시판
    public List<PostDTO> getPostsByCategory(String category) {
        CategoryEntity categoryEntity = categoryRepository.findByName(category);
        if (categoryEntity == null) {
            throw new IllegalArgumentException("Category not found");
        }

        return postRepository.findByCategory(categoryEntity)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }



}
