package com.midas.goseumdochi.util.ai;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class EncDecService {

    // AES 암호화
//    @Transactional
    public String encrypt(String plaintext) {
        String url = "http://34.64.213.105:5000/encrypt"; // Flask 서버 주소 + route 주소
        String password = "12345678"; // decrypt의 password와 꼭 같아야함!

        // Restful (Flask 서버)와 통신할 객체
        RestTemplate restTemplate = new RestTemplate();

        // HTTP 요청의 헤더를 설정하기 위한 객체
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON); //헤더의 Content-Type을 json으로 설정

        // input (JSON 형태)
        String param = String.format("{\"text\" : \"%s\", \"password\" : \"%s\"}", plaintext, password);

        // 변환된 JSON 문자열과 헤더 정보를 포함하는 HttpEntity 객체를 생성
        HttpEntity<String> httpEntity = new HttpEntity<String>(param, headers);

        // API 서버에 요청, 데이터 String 타입으로 받아옴
        EncDecDTO encDecDTO = restTemplate.postForObject(url, httpEntity, EncDecDTO.class);
        return encDecDTO.getEncrypted_text();
    }

    // AES 복호화
    public String decrypt(String encryptText) {
        String url = "http://34.64.213.105:5000/decrypt";
        String password = "12345678";

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String param = String.format("{\"text\" : \"%s\", \"password\" : \"%s\"}", encryptText, password);

        HttpEntity<String> httpEntity = new HttpEntity<String>(param, headers);

        EncDecDTO encDecDTO = restTemplate.postForObject(url, httpEntity, EncDecDTO.class);
        return encDecDTO.getDecrypted_text();
    }
}
