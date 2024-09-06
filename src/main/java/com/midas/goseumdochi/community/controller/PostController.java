package com.midas.goseumdochi.community.controller;

import com.midas.goseumdochi.community.dto.PostDTO;
import com.midas.goseumdochi.community.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping("/upload")
    public PostDTO createPost(@RequestBody PostDTO postDTO) {
        return postService.createPost(postDTO);
    }

    @GetMapping("/list")
    public List<PostDTO> getAllPosts() {
        return postService.getAllPosts();
    }

    @GetMapping("/hot")
    public List<PostDTO> getHotPosts() {
        return postService.getPostsByMinimumLikes(10);
    }

    @GetMapping("/{id}/with-comments")
    public PostDTO getPostByIdWithComments(@PathVariable Long id) {
        return postService.getPostByIdWithComments(id);
    }

    @GetMapping("/category/{category}")
    public List<PostDTO> getPostsByCategory(@PathVariable String category) {
        return postService.getPostsByCategory(category);
    }

    @DeleteMapping("/{postId}")
    public void deletePost(@PathVariable Long postId) {
        postService.deletePost(postId);
    }

    @GetMapping("/search")
    public List<PostDTO> searchPosts(@RequestParam(value = "keyword", defaultValue = "") String keyword) {
        System.out.println("Search Keyword: " + keyword); // 확인용
        return postService.searchPosts(keyword);
    }
}
