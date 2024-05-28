package com.midas.goseumdochi.academy.service;

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

@Service
@RequiredArgsConstructor
public class StudentAcademyService {
    private final StudentAcademyRepository studentAcademyRepository;
    private final StudentRepository studentRepository;
    private final AcademyRepository academyRepository;

    public void registStudentAcademy(StudentAcademyDTO studentAcademyDTO) {
        StudentAcademyEntity studentDirectorEntity = StudentAcademyEntity.builder()
                        .studentEntity(studentRepository.findById(studentAcademyDTO.getStudentId()).get())
                                .academyEntity(academyRepository.findById(studentAcademyDTO.getAcademyId()).get())
                                        .build();
        studentAcademyRepository.save(studentDirectorEntity);
    }

    // 학원에 등록한 학생 찾기
    public List<StudentDTO> getStudentDTOList(Long academyId) {
        List<StudentEntity> studentEntityList = studentAcademyRepository.findAllStudentByAcademyId(academyId);
        List<StudentDTO> studentDTOList = new ArrayList<>();
        for (StudentEntity entity : studentEntityList)
            studentDTOList.add(StudentDTO.toStudentDTO(entity));
        return studentDTOList;
    }
}
