package com.midas.goseumdochi.util.Service;

import com.midas.goseumdochi.student.Repository.RegistLectureRepository;
import com.midas.goseumdochi.teacher.entity.AssignmentEntity;
import com.midas.goseumdochi.teacher.entity.ExamEntity;
import com.midas.goseumdochi.teacher.repository.AssignmentRepository;
import com.midas.goseumdochi.teacher.repository.ExamRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CalendarService {

    private final AssignmentRepository assignmentRepository;
    private final ExamRepository examRepository;
    private final RegistLectureRepository registLectureRepository;

    public CalendarService(AssignmentRepository assignmentRepository,
                           ExamRepository examRepository,
                           RegistLectureRepository registLectureRepository) {
        this.assignmentRepository = assignmentRepository;
        this.examRepository = examRepository;
        this.registLectureRepository = registLectureRepository;
    }

    // 과제 가져오깅
    public List<AssignmentEntity> getAssignmentsByStudentId(Long id) {
        List<Long> lectureIds = registLectureRepository.findLectureIdsByStudentId(id);
        return assignmentRepository.findByLectureIds(lectureIds);
    }

    // 시험 가져오깅
    public List<ExamEntity> getExamsByStudentId(Long id) {
        List<Long> lectureIds = registLectureRepository.findLectureIdsByStudentId(id);
        return examRepository.findByLectureIds(lectureIds);
    }
}
