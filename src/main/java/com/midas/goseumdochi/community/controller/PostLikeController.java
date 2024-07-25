package com.midas.goseumdochi.community.controller;

import com.midas.goseumdochi.community.service.PostLikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/posts")
public class PostLikeController {

    @Autowired
    private PostLikeService postLikeService;

    @PostMapping("/{postId}/like")
    public ResponseEntity<Void> likePost(@PathVariable Long postId, @RequestParam Long studentId) {
        postLikeService.likePost(postId, studentId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{postId}/unlike")
    public ResponseEntity<Void> unlikePost(@PathVariable Long postId, @RequestParam Long studentId) {
        postLikeService.unlikePost(postId, studentId);
        return ResponseEntity.ok().build();
    }
}
