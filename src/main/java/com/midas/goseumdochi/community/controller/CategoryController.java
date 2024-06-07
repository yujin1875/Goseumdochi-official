package com.midas.goseumdochi.community.controller;

import com.midas.goseumdochi.community.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public List<Long> getAllCategories() {
        return categoryService.getAllCategoryIds();
    }
}
