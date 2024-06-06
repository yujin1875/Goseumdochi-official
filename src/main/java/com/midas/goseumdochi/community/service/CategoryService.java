package com.midas.goseumdochi.community.service;

import com.midas.goseumdochi.community.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Long> getAllCategoryIds() {
        return categoryRepository.findAll()
                .stream()
                .map(category -> category.getId())
                .collect(Collectors.toList());
    }
}
