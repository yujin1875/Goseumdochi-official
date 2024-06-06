package com.midas.goseumdochi.director.controller;

import com.midas.goseumdochi.academy.entity.AcademyEntity;
import com.midas.goseumdochi.academy.repository.AcademyRepository;
import com.midas.goseumdochi.director.entity.DirectorEntity;
import com.midas.goseumdochi.director.repository.DirectorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/manage")
public class ManagementDirectorController {

    private final DirectorRepository directorRepository;
    private final AcademyRepository academyRepository;

    @Autowired
    public ManagementDirectorController(DirectorRepository directorRepository, AcademyRepository academyRepository) {
        this.directorRepository = directorRepository;
        this.academyRepository = academyRepository;
    }

    // 학원 id에 해당하는 학원 정보 가져오기
    @GetMapping("/academy/{academyId}")
    public ResponseEntity<AcademyEntity> getAcademyInfo(@PathVariable Long academyId) {
        AcademyEntity academyEntity = academyRepository.findById(academyId)
                .orElseThrow(() -> new RuntimeException("Academy not found with id: " + academyId));
        return ResponseEntity.ok().body(academyEntity);
    }

    // 원장 정보 모두 가져오기
    @GetMapping("/director")
    public ResponseEntity<Iterable<DirectorEntity>> getAllDirectorsWithAcademy() {
        Iterable<DirectorEntity> directors = directorRepository.findAll();
        for (DirectorEntity director : directors) {
            if (director.getAcademyEntity() != null) {
                AcademyEntity academy = academyRepository.findById(director.getAcademyEntity().getId())
                        .orElseThrow(() -> new RuntimeException("Academy not found for director with id: " + director.getId()));
                director.setAcademyEntity(academy);
            }
        }
        return ResponseEntity.ok().body(directors);
    }

    // 원장 id에 해당하는 원장 정보 가져오기
    @GetMapping("/director/{directorId}")
    public ResponseEntity<DirectorEntity> getDirectorById(@PathVariable Long directorId) {
        DirectorEntity directorEntity = directorRepository.findById(directorId)
                .orElseThrow(() -> new RuntimeException("Director not found with id: " + directorId));
        if (directorEntity.getAcademyEntity() != null) {
            AcademyEntity academy = academyRepository.findById(directorEntity.getAcademyEntity().getId())
                    .orElseThrow(() -> new RuntimeException("Academy not found for director with id: " + directorId));
            directorEntity.setAcademyEntity(academy);
        }
        return ResponseEntity.ok().body(directorEntity);
    }
}
