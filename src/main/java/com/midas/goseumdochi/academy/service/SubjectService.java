package com.midas.goseumdochi.academy.service;

import com.midas.goseumdochi.academy.dto.SubjectDTO;
import com.midas.goseumdochi.academy.entity.SubjectEntity;
import com.midas.goseumdochi.academy.repository.SubjectRepository;
import com.midas.goseumdochi.director.repository.DirectorRepos;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SubjectService {
    private final SubjectRepository subjectRepository;
    private final DirectorRepos directorRepository;

    // 원장(학원)마다 과목 이름 있는지 검사
    public SubjectDTO findByNameAndDirectorId(String name, Long directorId) {
        Optional<SubjectEntity> findSubjectEntity = subjectRepository.findByNameAndDirectorId(name, directorId);
        if(findSubjectEntity.isEmpty()) // 과목이 존재하지 않음
            return null;
        return SubjectDTO.toSubjectDTO(findSubjectEntity.get()); // 과목 존재
    }

    // 처음 과목 등록
    public void regist(SubjectDTO subjectDTO) {
        // 이것도 에러나면 처음 static 함수 추가
        SubjectEntity subjectEntity = SubjectEntity.toSubjectEntity(subjectDTO, directorRepository.findById(subjectDTO.getDirectorId()).get());
        subjectRepository.save(subjectEntity);
    }
}
