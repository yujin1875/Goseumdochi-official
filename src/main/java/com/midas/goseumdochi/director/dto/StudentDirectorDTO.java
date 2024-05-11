package com.midas.goseumdochi.director.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class StudentDirectorDTO {
    private Long id;
    private Long studentId;
    private Long directorId;
}
