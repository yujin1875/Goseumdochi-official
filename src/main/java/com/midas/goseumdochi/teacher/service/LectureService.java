package com.midas.goseumdochi.teacher.service;

import com.midas.goseumdochi.academy.repository.SubjectRepository;
import com.midas.goseumdochi.teacher.dto.LectureDTO;
import com.midas.goseumdochi.teacher.dto.LectureTimeDTO;
import com.midas.goseumdochi.teacher.entity.LectureEntity;
import com.midas.goseumdochi.teacher.entity.LectureTimeEntity;
import com.midas.goseumdochi.teacher.repository.LectureRepository;
import com.midas.goseumdochi.teacher.repository.LectureTimeRepository;
import com.midas.goseumdochi.teacher.repository.TeacherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LectureService {
    private final LectureRepository lectureRepository;
    private final LectureTimeRepository lectureTimeRepository;
    private final TeacherRepository teacherRepository;
    private final SubjectRepository subjectRepository;

    // 강의 등록 (처음)
    public void regist(LectureDTO lectureDTO) {
        // 이것도 에러나면 처리
        LectureEntity lectureEntity = LectureEntity.toLectureEntity(lectureDTO,
                teacherRepository.findById(lectureDTO.getTeacherId()).get(),
                subjectRepository.findById(lectureDTO.getSubjectId()).get());

        lectureEntity = lectureRepository.save(lectureEntity);// 강의 저장 (id값 생김 아마)
        for (LectureTimeDTO dto : lectureDTO.getLectureTimeDTOList()) // 강의시간 저장
            lectureTimeRepository.save(LectureTimeEntity.toLectureTimeEntity(dto, lectureEntity));
    }

    // [선생] 모든 강의+시간 조회
    public List<LectureDTO> getLectureAndTimeListByTeacher(Long teacherId) {
        List<LectureEntity> lectureEntityList = lectureRepository.findAllByTeacherId(teacherId);
        List<LectureDTO> lectureDTOList = new ArrayList<>();
        for (LectureEntity entity : lectureEntityList)
            lectureDTOList.add(LectureDTO.toLectureAndTimeDTO(entity));
        return lectureDTOList;
    }

    // [선생] 검색어로 강의+시간 조회
    public List<LectureDTO> searchLectureAndTimeListByTeacher(Long teacherId, String word) {
        List<LectureEntity> lectureEntityList = lectureRepository.findAllByTeacherId(teacherId);
        List<LectureDTO> lectureDTOList = new ArrayList<>();
        for (LectureEntity entity : lectureEntityList)
            // 강의명에 검색어가 존재할 때 list에 추가
            if (entity.getName().toLowerCase().contains(word.toLowerCase()))
                lectureDTOList.add(LectureDTO.toLectureAndTimeDTO(entity));
        return lectureDTOList;
    }
}
