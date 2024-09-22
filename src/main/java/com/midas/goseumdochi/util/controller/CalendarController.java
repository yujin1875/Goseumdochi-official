package com.midas.goseumdochi.util.controller;

import com.midas.goseumdochi.teacher.entity.AssignmentEntity;
import com.midas.goseumdochi.teacher.entity.ExamEntity;
import com.midas.goseumdochi.util.Service.CalendarService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/calendar")
public class CalendarController {

    private final CalendarService calendarService;

    public CalendarController(CalendarService calendarService) {
        this.calendarService = calendarService;
    }

    @GetMapping("/assignments/{id}")
    public List<AssignmentEntity> getAssignments(@PathVariable Long id) { return calendarService.getAssignmentsByStudentId(id); }

    @GetMapping("/exams/{id}")
    public List<ExamEntity> getExams(@PathVariable Long id) {
        return calendarService.getExamsByStudentId(id);
    }
}

