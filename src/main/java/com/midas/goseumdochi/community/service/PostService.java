package com.midas.goseumdochi.community.service;

import com.midas.goseumdochi.academy.entity.AcademyEntity;
import com.midas.goseumdochi.academy.repository.AcademyRepository;
import com.midas.goseumdochi.community.dto.CommentDTO;
import com.midas.goseumdochi.community.dto.PostDTO;
import com.midas.goseumdochi.community.entity.CategoryEntity;
import com.midas.goseumdochi.community.entity.CommentEntity;
import com.midas.goseumdochi.community.entity.PostEntity;
import com.midas.goseumdochi.community.entity.PostLikeEntity;
import com.midas.goseumdochi.community.repository.CategoryRepository;
import com.midas.goseumdochi.community.repository.CommentRepository;
import com.midas.goseumdochi.community.repository.PostLikeRepository;
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

    @Autowired
    private AcademyRepository academyRepository;

    private final PostLikeRepository postLikeRepository;
    private final CommentRepository commentRepository;

    @Autowired
    public PostService(PostRepository postRepository, PostLikeRepository postLikeRepository, CommentRepository commentRepository) {
        this.postRepository = postRepository;
        this.postLikeRepository = postLikeRepository;
        this.commentRepository = commentRepository;
    }

    public PostDTO createPost(PostDTO postDTO) {
        StudentEntity writer = studentRepository.findById(postDTO.getWriterId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid writer ID"));

        CategoryEntity category = categoryRepository.findById(postDTO.getCategoryId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid category ID"));

        AcademyEntity academy = academyRepository.findById(postDTO.getAcademyId())
                .orElse(null); // academy가 null일 경우를 허용

        PostEntity postEntity = PostEntity.builder()
                .title(postDTO.getTitle())
                .content(postDTO.getContent())
                .createDate(postDTO.getCreateDate())
                .views(postDTO.getViews())
                .likeCount(postDTO.getLikeCount())
                .writer(writer)
                .category(category)
                .academy(academy) // academy가 null일 수 있음
                .isModified(postDTO.isModified())
                .star(postDTO.getStar() != null ? postDTO.getStar() : 0) // Null 체크 및 기본값 설정
                .build();

        postRepository.save(postEntity);

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
                .categoryId(postEntity.getCategory().getId())
                .academyId(postEntity.getAcademy() != null ? postEntity.getAcademy().getId() : 0L) // academy가 null일 경우 0으로 설정
                .isModified(postEntity.isModified())
                .star(postEntity.getStar()) // 별점 정보 추가
                .build();
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

    public PostDTO updatePost(Long id, PostDTO postDTO) {
        PostEntity postEntity = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Post not found"));

        CategoryEntity category = categoryRepository.findById(postDTO.getCategoryId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid category ID"));

        AcademyEntity academy = academyRepository.findById(postDTO.getAcademyId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid academy ID"));

        postEntity.setTitle(postDTO.getTitle());
        postEntity.setContent(postDTO.getContent());
        postEntity.setCategory(category);
        postEntity.setAcademy(academy);
        postEntity.setModified(true);
        postEntity.setCreateDate(LocalDateTime.now());
        postEntity.setStar(postDTO.getStar()); // 별점 정보 추가

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

    // 게시글 삭제
    public void deletePost(Long postId) {
        // 포스트에 연결된 모든 좋아요를 먼저 삭제
        List<PostLikeEntity> postLikes = postLikeRepository.findByPostId(postId);
        postLikeRepository.deleteAll(postLikes);

        // 포스트에 연결된 모든 댓글을 삭제
        List<CommentEntity> comments = commentRepository.findByPostId(postId);
        commentRepository.deleteAll(comments);

        // 그 후에 포스트를 삭제
        postRepository.deleteById(postId);
    }

    // 검색 기능
    public List<PostDTO> searchPosts(String keyword) {
        return postRepository.findByTitleContainingOrContentContaining(keyword, keyword).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
}
