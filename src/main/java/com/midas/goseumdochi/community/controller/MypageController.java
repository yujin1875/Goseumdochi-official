package com.midas.goseumdochi.community.controller;

import com.midas.goseumdochi.community.dto.PostDTO;
import com.midas.goseumdochi.community.dto.CommentDTO;
import com.midas.goseumdochi.community.service.MypageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mypage")
public class MypageController {

    @Autowired
    private MypageService mypageService;

    @GetMapping("/posts/{writerId}")
    public List<PostDTO> getPostsByWriterId(@PathVariable Long writerId) {
        return mypageService.getPostsByWriterId(writerId);
    }

    @GetMapping("/liked-posts/{writerId}")
    public List<PostDTO> getLikedPostsByWriterId(@PathVariable Long writerId) {
        return mypageService.getLikedPostsByWriterId(writerId);
    }

    @GetMapping("/comments/{writerId}")
    public List<CommentDTO> getCommentsByWriterId(@PathVariable Long writerId) {
        return mypageService.getCommentsByWriterId(writerId);
    }
}
