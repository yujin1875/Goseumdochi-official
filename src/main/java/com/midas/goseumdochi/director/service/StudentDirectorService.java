package com.midas.goseumdochi.director.service;

import com.midas.goseumdochi.director.dto.StudentDirectorDTO;
import com.midas.goseumdochi.director.entity.StudentDirectorEntity;
import com.midas.goseumdochi.director.repository.DirectorRepository;
import com.midas.goseumdochi.director.repository.StudentDirectorRepository;
import com.midas.goseumdochi.student.Repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StudentDirectorService {
    private final StudentDirectorRepository studentDirectorRepository;
    private final StudentRepository studentRepository;
    private final DirectorRepository directorRepos;

    public void registStudentDirector(StudentDirectorDTO studentDirectorDTO) {
        StudentDirectorEntity studentDirectorEntity = StudentDirectorEntity.builder()
                        .studentEntity(studentRepository.findById(studentDirectorDTO.getStudentId()).get())
                                .directorEntity(directorRepos.findById(studentDirectorDTO.getDirectorId()).get())
                                        .build();
        studentDirectorRepository.save(studentDirectorEntity);
    }
}
