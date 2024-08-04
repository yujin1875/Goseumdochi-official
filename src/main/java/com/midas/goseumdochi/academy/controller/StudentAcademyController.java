package com.midas.goseumdochi.academy.controller;

import com.midas.goseumdochi.academy.entity.AcademyEntity;
import com.midas.goseumdochi.academy.service.StudentAcademyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class StudentAcademyController {
    private final StudentAcademyService studentAcademyService;

    @GetMapping("/api/student/{studentId}/academies")
    public List<AcademyEntity> getAcademiesByStudent(@PathVariable Long studentId) {
        return studentAcademyService.getAcademiesByStudentId(studentId);
    }

}
