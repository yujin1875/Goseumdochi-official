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
}
