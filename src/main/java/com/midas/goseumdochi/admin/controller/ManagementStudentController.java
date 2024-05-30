package com.midas.goseumdochi.admin.controller;

import com.midas.goseumdochi.student.Service.StudentService;
import com.midas.goseumdochi.student.Dto.StudentDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/management/students")
@RequiredArgsConstructor
public class ManagementStudentController {

    private final StudentService studentService;

    @GetMapping
    public List<StudentDTO> getAllStudents() {
        return studentService.findAllStudents();
    }
}
