package com.midas.goseumdochi.academy.service;

import com.midas.goseumdochi.academy.dto.AcademyDTO;
import com.midas.goseumdochi.academy.entity.AcademyEntity;
import com.midas.goseumdochi.academy.repository.AcademyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AcademyService {

    private final AcademyRepository academyRepository;

    public List<AcademyEntity> findAllAcademies() {
        return academyRepository.findAll();
    }

    public Optional<Long> getAcademyIdByName(String academyName) {
        return academyRepository.findIdByName(academyName);
    }

    public Optional<String> getAcademyNameById(Long academyId) {
        return academyRepository.findNameById(academyId);
    }

    public List<AcademyDTO> getAllAcademyAndDirector() {
        List<AcademyEntity> academyEntityList = academyRepository.findAll();
        List<AcademyDTO> academyDTOList = new ArrayList<>();
        for (AcademyEntity entity : academyEntityList)
            academyDTOList.add(AcademyDTO.fromAcademyEntity(entity));
        return academyDTOList;
    }

}
