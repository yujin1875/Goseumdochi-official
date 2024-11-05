package com.midas.goseumdochi.util.Service;

import com.midas.goseumdochi.student.Repository.RegistLectureRepository;
import com.midas.goseumdochi.teacher.entity.AssignmentEntity;
import com.midas.goseumdochi.teacher.entity.ExamEntity;
import com.midas.goseumdochi.teacher.entity.LectureEntity;
import com.midas.goseumdochi.teacher.repository.AssignmentRepository;
import com.midas.goseumdochi.teacher.repository.ExamRepository;
import com.midas.goseumdochi.teacher.repository.LectureRepository;
import com.midas.goseumdochi.util.Dto.CalendarDTO;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CalendarService {

    private final AssignmentRepository assignmentRepository;
    private final ExamRepository examRepository;
    private final RegistLectureRepository registLectureRepository;
    private final LectureRepository lectureRepository;

    public CalendarService(AssignmentRepository assignmentRepository,
                           ExamRepository examRepository,
                           RegistLectureRepository registLectureRepository,
                           LectureRepository lectureRepository) {
        this.assignmentRepository = assignmentRepository;
        this.examRepository = examRepository;
        this.registLectureRepository = registLectureRepository;
        this.lectureRepository = lectureRepository;
    }

    // 학생
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

    public List<CalendarDTO> getCalendarEventsByStudentId(Long studentId) {
        List<CalendarDTO> events = new ArrayList<>();

        // 과제 가져오기
        List<AssignmentEntity> assignments = getAssignmentsByStudentId(studentId);
        for (AssignmentEntity assignment : assignments) {
            events.add(new CalendarDTO(assignment.getTitle(), "assignment", assignment.getDeadline())); // 변경된 부분
        }

        // 시험 가져오기
        List<ExamEntity> exams = getExamsByStudentId(studentId);
        for (ExamEntity exam : exams) {
            events.add(new CalendarDTO(exam.getTitle(), "exam", exam.getExamPeriodStart())); // exam의 날짜를 가져오는 부분도 필요에 따라 수정
        }

        return events;
    }

    public List<AssignmentEntity> getAssignmentByTeacherId(Long id) {
        List<Long> lectureIds = lectureRepository.findAllLectureIdsByTeacherId(id);
        return assignmentRepository.findByLectureIds(lectureIds);
    }

    public List<ExamEntity> getExamsByTeacherId(Long id) {
        List<Long> lectureIds = lectureRepository.findAllLectureIdsByTeacherId(id);
        return examRepository.findByLectureIds(lectureIds);
    }

    // 선생
    public List<CalendarDTO> getCalendarEventsByTeacherId(Long teacherId) {
        List<CalendarDTO> events = new ArrayList<>();

        // 과제 가져오기
        List<AssignmentEntity> assignments = getAssignmentByTeacherId(teacherId);
        for (AssignmentEntity assignment : assignments) {
            events.add(new CalendarDTO(assignment.getTitle(), "assignment", assignment.getDeadline()));
        }

        // 시험 가져오기
        List<ExamEntity> exams = getExamsByTeacherId(teacherId);
        for (ExamEntity exam : exams) {
            events.add(new CalendarDTO(exam.getTitle(), "exam", exam.getExamPeriodStart()));
        }

        return events;
    }


}
