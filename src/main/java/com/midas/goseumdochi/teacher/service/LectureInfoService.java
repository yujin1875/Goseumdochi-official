package com.midas.goseumdochi.teacher.service;

import com.midas.goseumdochi.teacher.dto.LectureDTO;
import com.midas.goseumdochi.teacher.entity.LectureEntity;
import com.midas.goseumdochi.teacher.entity.TeacherEntity;
import com.midas.goseumdochi.teacher.repository.LectureRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LectureInfoService {
    private final LectureRepository lectureRepository;
    private final TeacherService teacherService;

    // 강의 정보를 가져오는 메서드
    public LectureDTO getLectureInfo(Long lectureId) {
        Optional<LectureEntity> lectureEntityOptional = lectureRepository.findById(lectureId);
        if (lectureEntityOptional.isPresent()) {
            return LectureDTO.toLectureAndTimeDTO(lectureEntityOptional.get());
        } else {
            throw new RuntimeException("강의를 찾을 수 없습니다.");
        }
    }

    // 강의 정보를 업데이트하는 메서드
    public void updateLectureInfo(LectureDTO lectureDTO) {
        Optional<LectureEntity> lectureEntityOptional = lectureRepository.findById(lectureDTO.getId());
        if (lectureEntityOptional.isPresent()) {
            LectureEntity lectureEntity = lectureEntityOptional.get();
            TeacherEntity teacherEntity = teacherService.findEntityById(lectureDTO.getTeacherId());
            lectureEntity.setLectureLocation(lectureDTO.getLectureLocation());
            lectureEntity.setLectureDetails(lectureDTO.getLectureDetails());
            lectureEntity.setLectureWeeklyPlan(lectureDTO.getLectureWeeklyPlan());
            lectureEntity.setTeacherEntity(teacherEntity);
            lectureRepository.save(lectureEntity);
        } else {
            throw new RuntimeException("강의를 찾을 수 없습니다.");
        }
    }
}
