package com.midas.goseumdochi.util.ai;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@RequiredArgsConstructor
public class AITestController {
    private final EncDecService encDecService;
    private final BadwordService badwordService;
    
    @GetMapping("/ai/test/encrypt")
    public String encryptTest() {
        String plaintext = "hi";
        String encrypt = encDecService.encrypt(plaintext);
        System.out.println("암호화 결과: "+ encrypt);
        return "index.html";
    }

    @GetMapping("/ai/test/decrypt")
    public String decryptTest() {
        String encryptText = "GBtl53e85Mec9EL4nQ1h4A==";
        String decrypt = encDecService.decrypt(encryptText);
        System.out.println("복호화 결과: "+ decrypt);
        return "index.html";
    }

    @GetMapping("/ai/test/badword")
    public String badwordTest() {
        String text = "";
        BadwordDTO badwordDTO = badwordService.classify(text);
        System.out.println("텍스트: " + text + "\t나쁜말 분류 결과: "+ badwordDTO.getLabel());
        return "index.html";
    }
}
