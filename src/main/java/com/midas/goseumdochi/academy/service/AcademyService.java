package com.midas.goseumdochi.academy.service;

import com.midas.goseumdochi.academy.entity.AcademyEntity;
import com.midas.goseumdochi.academy.repository.AcademyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AcademyService {

    private final AcademyRepository academyRepository;

    public List<AcademyEntity> findAllAcademies() {
        return academyRepository.findAll();
    }
}
