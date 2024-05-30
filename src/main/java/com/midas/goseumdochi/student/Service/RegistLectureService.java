package com.midas.goseumdochi.student.Service;

import com.midas.goseumdochi.academy.service.StudentAcademyService;
import com.midas.goseumdochi.student.Dto.StudentDTO;
import com.midas.goseumdochi.student.Repository.RegistLectureRepository;
import com.midas.goseumdochi.student.Repository.StudentRepository;
import com.midas.goseumdochi.student.entity.RegistLectureEntity;
import com.midas.goseumdochi.student.entity.StudentEntity;
import com.midas.goseumdochi.teacher.dto.LectureDTO;
import com.midas.goseumdochi.teacher.entity.LectureEntity;
import com.midas.goseumdochi.teacher.repository.LectureRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RegistLectureService {
    private final RegistLectureRepository registLectureRepository;
    private final LectureRepository lectureRepository;
    private final StudentRepository studentRepository;
    private final StudentAcademyService studentAcademyService;

    // 강의에 학생 등록
    public void regist(Long lectureId, Long studentId) {
        // 수강 등록
        Optional<LectureEntity> lectureEntity = lectureRepository.findById(lectureId);
        RegistLectureEntity registLectureEntity = RegistLectureEntity.builder()
                .lectureEntity(lectureEntity.get())
                .studentEntity(studentRepository.findById(studentId).get())
                .build();
        registLectureRepository.save(registLectureEntity);

        // 강의 현재 인원수 ++ 업데이트
        LectureDTO lectureDTO = LectureDTO.toLectureAndTimeDTO(lectureEntity.get());
        lectureDTO.setHeadCount(lectureDTO.getHeadCount() + 1);
        lectureRepository.save(LectureEntity.toLectureEntity(lectureDTO, lectureEntity.get().getTeacherEntity(),
                lectureEntity.get().getSubjectEntity()));
    }

    // 강의에 등록된 학생 삭제
    public boolean delete(Long lectureId, Long studentId) {
        // 수강 삭제
        Optional<RegistLectureEntity> registLectureEntity = registLectureRepository.findByLectureIdAndStudentId(lectureId, studentId);
        if(registLectureEntity.isEmpty())
            return false;
        registLectureRepository.delete(registLectureEntity.get()); // 삭제

        // 강의 현재 인원수 -- 업데이트
        LectureEntity lectureEntity = registLectureEntity.get().getLectureEntity();
        LectureDTO lectureDTO = LectureDTO.toLectureAndTimeDTO(lectureEntity);
        lectureDTO.setHeadCount(lectureDTO.getHeadCount() - 1);
        lectureRepository.save(LectureEntity.toLectureEntity(lectureDTO, lectureEntity.getTeacherEntity(),
                lectureEntity.getSubjectEntity()));
        return true;
    }

    // 강의를 수강하는 학생 리스트 반환
    public List<StudentDTO> getExistStudentDTOList(Long lectureId) {
        List<StudentEntity> studentEntityList = registLectureRepository.findAllStudentByLectureId(lectureId);
        List<StudentDTO> studentDTOList = new ArrayList<>();
        for (StudentEntity entity : studentEntityList)
            studentDTOList.add(StudentDTO.toStudentDTO(entity));
        return studentDTOList;
    }

    // 강의를 수강하지 않는 학생 리스트 반환
    public List<StudentDTO> getNonExistStudentDTOList(Long lectureId) {
        List<StudentEntity> existStudentList = registLectureRepository.findAllStudentByLectureId(lectureId); // 수강하는 학생
        // 학원에 수강하는 모든 학생
        Long academyId = lectureRepository.findById(lectureId).get().getTeacherEntity().getAcademyEntity().getId();
        List<StudentDTO> studentDTOList = studentAcademyService.getStudentDTOList(academyId);
        for (StudentEntity existEntity : existStudentList) {
            Iterator it = studentDTOList.iterator();
            while(it.hasNext()) {
                StudentDTO findDTO = (StudentDTO) it.next();
                if (findDTO.getId() == existEntity.getId()) { // 수강하는 학생이면 리스트에서 제거
                    it.remove();
                    break;
                }
            }
        }
        return studentDTOList;
    }
}
