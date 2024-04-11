package com.midas.goseumdochi.director.service;

import com.midas.goseumdochi.director.dto.DirectorDTO;
import com.midas.goseumdochi.director.entity.DirectorEntity;
import com.midas.goseumdochi.director.repository.DirectorRepos;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DirectorService {
    private final DirectorRepos directorRepository;

    // 로그인아이디와 비밀번호로 원장 찾기
    public DirectorDTO findDirector(String loginid, String password) { //* 리턴을 Optional로 할까
        Optional<DirectorEntity> findDirector = directorRepository.findByLoginidAndPassword(loginid, password);

        // 원장 없음
        if(findDirector.isEmpty())
            return null;
        // 원장 찾음
        return DirectorDTO.toDirectorDTO(findDirector.get());
    }
}
