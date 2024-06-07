package com.midas.goseumdochi.admin.controller;

import com.midas.goseumdochi.academy.entity.AcademyEntity;
import com.midas.goseumdochi.academy.service.AcademyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/management/academy")
@RequiredArgsConstructor
public class ManagementAcademyController {

    private final AcademyService academyService;

    @GetMapping
    public List<AcademyEntity> getAllAcademies() {
        return academyService.findAllAcademies();
    }
}
