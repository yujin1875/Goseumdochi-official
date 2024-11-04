package com.midas.goseumdochi.util.Service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.translate.Translate;
import com.google.cloud.translate.TranslateOptions;
import com.google.cloud.translate.Translation;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.IOException;

@Service
public class TranslationService {
    private final Translate translate;

    public TranslationService() {
        // 서비스 계정 키 파일 경로 설정
        try {
            System.setProperty("GOOGLE_APPLICATION_CREDENTIALS", "src/main/resources/midas-429814-131f5047d950.json");
            this.translate = TranslateOptions.newBuilder()
                    .setCredentials(GoogleCredentials.fromStream(new FileInputStream("src/main/resources/midas-429814-131f5047d950.json")))
                    .build()
                    .getService();
        } catch (IOException e) {
            throw new RuntimeException("Failed to initialize TranslationService", e);
        }
    }

    public String translateText(String text, String targetLanguage) {
        Translation translation = translate.translate(text, Translate.TranslateOption.targetLanguage(targetLanguage));
        return translation.getTranslatedText();
    }
}
