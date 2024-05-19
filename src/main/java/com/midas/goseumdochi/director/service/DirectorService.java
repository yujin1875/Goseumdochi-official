package com.midas.goseumdochi.director.service;

import com.midas.goseumdochi.director.dto.DirectorDTO;
import com.midas.goseumdochi.director.entity.DirectorEntity;
import com.midas.goseumdochi.director.repository.DirectorRepository;
import com.midas.goseumdochi.util.ai.EncDecService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DirectorService {
    private final DirectorRepository directorRepository;
    private final EncDecService encDecService;

    // 로그인아이디와 비밀번호로 원장 찾기
    public DirectorDTO login(String loginid, String password) {
        Optional<DirectorEntity> findDirector = directorRepository.findByLoginid(loginid);

        // 원장 없음 || 복호화한 비밀번호 불일치
        if(findDirector.isEmpty() || !password.equals(encDecService.decrypt(findDirector.get().getPassword())))
            return null;
        // 원장 찾음
        return DirectorDTO.toDirectorDTO(findDirector.get());
    }
}
