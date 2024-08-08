package com.midas.goseumdochi.academy.service;

import com.midas.goseumdochi.academy.entity.AcademyEntity;
import com.midas.goseumdochi.academy.repository.AcademyRepository;
import com.midas.goseumdochi.academy.dto.StudentAcademyDTO;
import com.midas.goseumdochi.academy.entity.StudentAcademyEntity;
import com.midas.goseumdochi.academy.repository.StudentAcademyRepository;
import com.midas.goseumdochi.student.Dto.StudentDTO;
import com.midas.goseumdochi.student.Repository.StudentRepository;
import com.midas.goseumdochi.student.entity.StudentEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StudentAcademyService {
    private final StudentAcademyRepository studentAcademyRepository;
    private final StudentRepository studentRepository;
    private final AcademyRepository academyRepository;

    public StudentAcademyDTO registStudentAcademy(Long studentId, Long academyId) {
        StudentAcademyEntity studentDirectorEntity = StudentAcademyEntity.builder()
                        .studentEntity(studentRepository.findById(studentId).get())
                                .academyEntity(academyRepository.findById(academyId).get())
                                        .build();
        return StudentAcademyDTO.toStudentAcademyDTO(studentAcademyRepository.save(studentDirectorEntity));
    }

    // 학원에 등록한 학생 찾기
    public List<StudentDTO> getStudentDTOList(Long academyId) {
        List<StudentEntity> studentEntityList = studentAcademyRepository.findAllStudentByAcademyId(academyId);
        List<StudentDTO> studentDTOList = new ArrayList<>();
        for (StudentEntity entity : studentEntityList)
            studentDTOList.add(StudentDTO.toStudentDTO(entity));
        return studentDTOList;
    }

    // 학원에 등록한 특정 학생 찾기
    public StudentAcademyDTO getStudentDto(Long studentId, Long academyId) {
        Optional<StudentAcademyEntity> studentAcademyEntity = studentAcademyRepository.findByStudentIdAndAcademyId(studentId ,academyId);

        if(studentAcademyEntity.isEmpty()) // 등록되어있지 않음
            return null;

        return StudentAcademyDTO.toStudentAcademyDTO(studentAcademyEntity.get());
    }

    // 학생이 등록한 학원 목록을 반환
    public List<AcademyEntity> getAcademiesByStudentId(Long studentId) {
        List<StudentAcademyEntity> studentAcademyEntities = studentAcademyRepository.findByStudentEntityId(studentId);
        List<AcademyEntity> academies = new ArrayList<>();
        for (StudentAcademyEntity entity : studentAcademyEntities) {
            academies.add(entity.getAcademyEntity());
        }
        return academies;
    }

    // 학원에서 학생 삭제
    public boolean delete(Long academyId, Long studentId) {
        Optional<StudentAcademyEntity> studentAcademyEntity = studentAcademyRepository.findByStudentIdAndAcademyId(studentId, academyId);
        if(studentAcademyEntity.isEmpty())
            return false;

        studentAcademyRepository.delete(studentAcademyEntity.get());
        return true;
    }
}
