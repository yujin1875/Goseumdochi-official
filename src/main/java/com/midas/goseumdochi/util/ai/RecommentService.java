package com.midas.goseumdochi.util.ai;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@Service
public class RecommentService {

    // 텍스트 입력 후 비방 목적의 글인지 판별
    public List<RecommendDTO> recommend(String major_subject, int n_recommendations) {
        String url = "http://34.64.213.105:5002/recommend"; // Flask 서버 주소 + route 주소
        // Restful (Flask 서버)와 통신할 객체
        RestTemplate restTemplate = new RestTemplate();

        // HTTP 요청의 헤더를 설정하기 위한 객체
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON); //헤더의 Content-Type을 json으로 설정

        // input (JSON 형태)
        String param = String.format("{\"major_subject\" : \"%s\", \"n_recommendations\" : %d}", major_subject, n_recommendations);

        // 변환된 JSON 문자열과 헤더 정보를 포함하는 HttpEntity 객체를 생성
        HttpEntity<String> httpEntity = new HttpEntity<String>(param, headers);

        // API 서버에 요청, 데이터 String 타입으로 받아옴
        List<RecommendDTO> recommendDTOList = Arrays.asList(restTemplate.postForObject(url, httpEntity, RecommendDTO[].class));
        return recommendDTOList;
    }
}
