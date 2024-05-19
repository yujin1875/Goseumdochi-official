package com.midas.goseumdochi.util.ai;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BadwordDTO {
    private String label; // 1: 비방, 0: 비방아님
    private String error; // 에러메시지 저장
}
