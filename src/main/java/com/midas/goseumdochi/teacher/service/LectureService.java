package com.midas.goseumdochi.teacher.service;

import com.midas.goseumdochi.academy.repository.SubjectRepository;
import com.midas.goseumdochi.student.Repository.RegistLectureRepository;
import com.midas.goseumdochi.teacher.dto.LectureDTO;
import com.midas.goseumdochi.teacher.dto.LectureNameDTO;
import com.midas.goseumdochi.teacher.dto.LectureTimeDTO;
import com.midas.goseumdochi.teacher.dto.TeacherDTO;
import com.midas.goseumdochi.teacher.entity.LectureEntity;
import com.midas.goseumdochi.teacher.entity.LectureTimeEntity;
import com.midas.goseumdochi.teacher.repository.LectureRepository;
import com.midas.goseumdochi.teacher.repository.LectureTimeRepository;
import com.midas.goseumdochi.teacher.repository.TeacherRepository;
import com.midas.goseumdochi.util.Dto.NameDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LectureService {
    private final LectureRepository lectureRepository;
    private final LectureTimeRepository lectureTimeRepository;
    private final TeacherRepository teacherRepository;
    private final SubjectRepository subjectRepository;
    private final RegistLectureRepository registLectureRepository;

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

    // 강의 삭제
    public Boolean deleteLecture(Long lectureId) {
        Optional<LectureEntity> lectureEntity = lectureRepository.findById(lectureId);

        // 강의 삭제 실패
        if(lectureEntity.isEmpty())
            return false;

        // 성공
        lectureRepository.delete(lectureEntity.get());
        return true;
    }

    // 강의 선생 '이름' 조회
    public NameDTO getTeacherNameOfLecture(Long lectureId) {
        Optional<LectureEntity> lectureEntity = lectureRepository.findById(lectureId);
        NameDTO teacherNameDTO = new NameDTO(lectureEntity.get().getTeacherEntity().getId(), lectureEntity.get().getTeacherEntity().getName());
        return teacherNameDTO;
    }

    // 강의 선생 조회
    public TeacherDTO getTeacherOfLecture(Long lectureId) {
        Optional<LectureEntity> lectureEntity = lectureRepository.findById(lectureId);
        TeacherDTO teacherDTO = TeacherDTO.toTeacherDTO(lectureEntity.get().getTeacherEntity());
        return teacherDTO;
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

    // [선생] 모든 강의 "이름" 리스트 조회
    public List<LectureNameDTO> getLectureNameListByTeacher(Long teacherId) {
        List<LectureEntity> lectureEntityList = lectureRepository.findAllByTeacherId(teacherId);
        List<LectureNameDTO> lectureNameDTOList = new ArrayList<>();
        for (LectureEntity entity : lectureEntityList)
            lectureNameDTOList.add(LectureNameDTO.toLectureNameDTO(entity));
        return lectureNameDTOList;
    }

    // [학생] 모든 강의+시간 조회
    public List<LectureDTO> getLectureAndTimeListByStudent(Long studentId) {
        List<LectureEntity> lectureEntityList = registLectureRepository.findAllLectureByStudentId(studentId);
        List<LectureDTO> lectureDTOList = new ArrayList<>();
        for (LectureEntity entity : lectureEntityList)
            lectureDTOList.add(LectureDTO.toLectureAndTimeDTO(entity));
        return lectureDTOList;
    }

    // [학생] 모든 강의 "이름" 리스트 조회
    public List<LectureNameDTO> getLectureNameListByStudent(Long studentId) {
        List<LectureEntity> lectureEntityList = registLectureRepository.findAllLectureByStudentId(studentId);
        List<LectureNameDTO> lectureNameDTOList = new ArrayList<>();
        for (LectureEntity entity : lectureEntityList)
            lectureNameDTOList.add(LectureNameDTO.toLectureNameDTO(entity));
        return lectureNameDTOList;
    }
}
