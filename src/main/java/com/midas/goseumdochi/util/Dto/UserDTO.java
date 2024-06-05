package com.midas.goseumdochi.util.Dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserDTO {
    private Long id; // 원장 or 선생 or 학생 id(pk) 저장
    private String role; // 역할 저장
    private Long academyId; // 학원 id 저장 (원장 | 선생)
    private List<Long> academyIdList; // 학원 id 리스트 (학생)

    // 원장 | 선생 생성자
    public UserDTO(Long id, String role, Long academyId) {
        this.id = id;
        this.role = role;
        this.academyId = academyId;
    }

    // 학생 생성자
    public UserDTO(Long id, String role, List<Long> academyIdList) {
        this.id = id;
        this.role = role;
        this.academyIdList = academyIdList;
    }
}
