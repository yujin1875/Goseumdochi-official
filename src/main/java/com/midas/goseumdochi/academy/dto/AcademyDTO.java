package com.midas.goseumdochi.academy.dto;

import com.midas.goseumdochi.academy.entity.AcademyEntity;
import com.midas.goseumdochi.director.dto.DirectorDTO;
import lombok.*;

@Getter //getter 자동 만들어줌
@Setter
@NoArgsConstructor //기본 생성자
@AllArgsConstructor //모든 변수를 포함한 생성자
@ToString //toString 자동 생성
public class AcademyDTO {
    private Long id;
    private String name;
    private String phoneNumber;
    private String postcode;
    private String address;
    private String addressDetail;
    private DirectorDTO directorDTO;

    public static AcademyDTO fromAcademyEntity(AcademyEntity academyEntity) {
        AcademyDTO dto = new AcademyDTO();
        dto.setId(academyEntity.getId());
        dto.setName(academyEntity.getName());
        dto.setPhoneNumber(academyEntity.getPhoneNumber());
        dto.setPostcode(academyEntity.getPostcode());
        dto.setAddress(academyEntity.getAddress());
        dto.setAddressDetail(academyEntity.getAddressDetail());
        dto.setDirectorDTO(DirectorDTO.toDirectorDTO(academyEntity.getDirectorEntity()));
        return dto;
    }
}
