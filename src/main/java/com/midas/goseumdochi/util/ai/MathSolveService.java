package com.midas.goseumdochi.util.ai;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class MathSolveService {

    // 수학문제를 text로 입력하면 해답을 문자열로 출력
    public MathSolveDTO mathSolve(String problem) {
        String url = "http://34.64.39.249:5004/solve"; // Flask 서버 주소 + route 주소

        // Restful (Flask 서버)와 통신할 객체
        RestTemplate restTemplate = new RestTemplate();

        // HTTP 요청의 헤더를 설정하기 위한 객체
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON); //헤더의 Content-Type을 json으로 설정

        // input (JSON 형태)
        String param = String.format("{\"problem\" : \"%s\"}", problem);

        // 변환된 JSON 문자열과 헤더 정보를 포함하는 HttpEntity 객체를 생성
        HttpEntity<String> httpEntity = new HttpEntity<String>(param, headers);

        // API 서버에 요청, 데이터 String 타입으로 받아옴
        MathSolveDTO mathSolveDTO = restTemplate.postForObject(url, httpEntity, MathSolveDTO.class);
        return mathSolveDTO;
    }
}
