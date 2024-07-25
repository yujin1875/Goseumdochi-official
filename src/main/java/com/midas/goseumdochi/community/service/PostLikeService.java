package com.midas.goseumdochi.community.service;

import com.midas.goseumdochi.community.entity.PostEntity;
import com.midas.goseumdochi.community.entity.PostLikeEntity;
import com.midas.goseumdochi.community.repository.PostLikeRepository;
import com.midas.goseumdochi.community.repository.PostRepository;
import com.midas.goseumdochi.student.entity.StudentEntity;
import com.midas.goseumdochi.student.Repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class PostLikeService {

    @Autowired
    private PostLikeRepository postLikeRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Transactional
    public void likePost(Long postId, Long studentId) {
        Optional<PostEntity> postOpt = postRepository.findById(postId);
        Optional<StudentEntity> studentOpt = studentRepository.findById(studentId);

        if (postOpt.isPresent() && studentOpt.isPresent()) {
            PostEntity post = postOpt.get();
            StudentEntity student = studentOpt.get();

            if (!postLikeRepository.existsByPostAndStudent(post, student)) {
                PostLikeEntity postLike = PostLikeEntity.builder()
                        .post(post)
                        .student(student)
                        .build();

                post.incrementLikes();
                postLikeRepository.save(postLike);
                postRepository.save(post);
            }
        }
    }

    @Transactional
    public void unlikePost(Long postId, Long studentId) {
        Optional<PostEntity> postOpt = postRepository.findById(postId);
        Optional<StudentEntity> studentOpt = studentRepository.findById(studentId);

        if (postOpt.isPresent() && studentOpt.isPresent()) {
            PostEntity post = postOpt.get();
            StudentEntity student = studentOpt.get();

            Optional<PostLikeEntity> postLikeOpt = postLikeRepository.findByPostAndStudent(post, student);
            if (postLikeOpt.isPresent()) {
                PostLikeEntity postLike = postLikeOpt.get();

                post.decrementLikes();
                postLikeRepository.delete(postLike);
                postRepository.save(post);
            }
        }
    }
}
