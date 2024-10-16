package com.midas.goseumdochi.util.ai;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class VideoCaptionService {

    // 동영상 URL을 입력하면 자막과 처리된 동영상 경로를 반환하는 메서드
    public VideoCaptionDTO generateCaption(String videoUrl) {
        String url = "http://34.64.39.249:5005/request_text"; // 자막 생성 API 주소

        // Restful (Flask 서버)와 통신할 객체
        RestTemplate restTemplate = new RestTemplate();

        // HTTP 요청의 헤더를 설정하기 위한 객체
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON); // 헤더의 Content-Type을 JSON으로 설정

        // input (JSON 형태)
        String param = String.format("{\"video_url\" : \"%s\"}", videoUrl);

        // 변환된 JSON 문자열과 헤더 정보를 포함하는 HttpEntity 객체를 생성
        HttpEntity<String> httpEntity = new HttpEntity<String>(param, headers);

        // API 서버에 요청, 데이터를 VideoCaptionDTO 타입으로 받아옴
        VideoCaptionDTO videoCaptionDTO = restTemplate.postForObject(url, httpEntity, VideoCaptionDTO.class);
        return videoCaptionDTO;
    }
}
