package com.midas.goseumdochi.util.ai;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RecommendDTO {
    private double distance;
    private String 관련직업명; // 보다 좋은 방법은 변수명을 영어로 바꾸는 것입니다. 예: relatedJobNames
    private String 단과대학명; // collegeName
    private String 대학자체계열명; // universityMajorField
    private String 수업연한; // courseDuration
    private int 입학정원수; // admissionQuota
    private int 졸업자수; // numberOfGraduates
    private String 주야과정명; // dayOrNightCourse
    private String 주요교과목명; // majorSubjects
    private String 학과명; // departmentName
    private String 학교구분명; // schoolType
    private String 학교명; // schoolName
    private String 학교학과특성명; // schoolDepartmentFeature
    private String 학위과정명; // degreeProgram
}
