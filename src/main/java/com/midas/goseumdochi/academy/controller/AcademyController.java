package com.midas.goseumdochi.academy.controller;

import com.midas.goseumdochi.academy.entity.AcademyEntity;
import com.midas.goseumdochi.academy.service.AcademyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/academies")
@RequiredArgsConstructor
public class AcademyController {

    private final AcademyService academyService;

    @GetMapping
    public List<String> getAllAcademyNames() {
        List<AcademyEntity> academies = academyService.findAllAcademies();
        return academies.stream()
                .map(AcademyEntity::getName)
                .collect(Collectors.toList());
    }

    @GetMapping("list")
    public List<AcademyEntity> getAllAcademies() {
        return academyService.findAllAcademies();
    }
}