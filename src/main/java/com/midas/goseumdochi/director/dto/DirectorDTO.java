package com.midas.goseumdochi.director.dto;

import com.midas.goseumdochi.director.entity.DirectorEntity;
import lombok.*;

import java.time.LocalDate;

//lombok 라이브러리가 제공해주는 어노테이션
@Getter //getter 자동 만들어줌
@Setter
@NoArgsConstructor //기본 생성자
@AllArgsConstructor //모든 변수를 포함한 생성자
@ToString //toString 자동 생성
public class DirectorDTO {
    private Long id;
    private String name;
    private String loginid; // 8자리 숫자 (자릿수마다 의마가 있어서 문자열로)
    private String password;
    private String phoneNumber;
    private LocalDate birthdate;
    private String email;

    // 일단 빌더 안 씀

    // DirectorEntity -> DirectorDTO
    public static DirectorDTO toDirectorDTO(DirectorEntity directorEntity) {
        DirectorDTO directorDTO = new DirectorDTO();
        directorDTO.setId(directorDTO.getId());
        directorDTO.setName(directorDTO.getName());
        directorDTO.setLoginid(directorDTO.getLoginid());
        directorDTO.setPassword(directorDTO.getPassword());
        directorDTO.setPhoneNumber(directorEntity.getPhoneNumber());
        directorDTO.setBirthdate(directorEntity.getBirthdate());
        directorDTO.setEmail(directorDTO.getEmail());

        return directorDTO;
    }
}
