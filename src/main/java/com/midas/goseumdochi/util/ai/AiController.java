package com.midas.goseumdochi.util.ai;

import com.midas.goseumdochi.util.Service.TranslationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiController {
    private final RecommendService recommendService;
    private final TextSummaryService textSummaryService;
    private final MathSolveService mathSolveService;
    private final TranslationService translationService;

    // AI 대학-학과 추천
    @GetMapping("/recommend/univ")
    public ResponseEntity<?> recommendUniv(@RequestParam String major_subject, @RequestParam int n_recommendations) {
        List<RecommendDTO> recommendList = recommendService.recommend(major_subject, n_recommendations);
        return ResponseEntity.ok(recommendList);
    }

    // AI 문서 요약
    @GetMapping("/text/summary")
    public ResponseEntity<?> textSummary(@RequestParam String text) {
        String textSummary = textSummaryService.textSummary(text);
        return ResponseEntity.ok(textSummary);
    }

    // AI 수학 문제 풀이
    @GetMapping("/math/solve")
    public ResponseEntity<?> mathSolve(@RequestParam String problem) {
        MathSolveDTO mathSolveDTO = mathSolveService.mathSolve(problem);

        // 에러
        if(mathSolveDTO.getError() != null)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(mathSolveDTO.getError());

        // 해답이 영어라 한글로 번역하여 리턴
        String translateSol = translationService.translateText(mathSolveDTO.getSolution(), "ko");

        return ResponseEntity.ok(translateSol);
    }
}
