package com.midas.goseumdochi.util.component;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Component
public class PageComponent {

    // 화면에서 페이지 시작번호
    public int getStartPage(int pageNumber, int blockLimit) {
        // if 페이지를 10개씩 보여준다면 1 2 3 ... 10 -> 1 / 11 12 13 ... 20 -> 11
        return (int)((pageNumber - 1) / blockLimit) * blockLimit + 1;
    }

    // 화면에서 페이지 끝 번호
    public int getEndPage(int startPage, int blockLimit, int totalPage) {
        // if 페이지를 10개씩 보여준다면 1 2 3 ... 10 -> 10 / 페이지가 16까지밖에 없으면 11 12 13 ... 16 -> 16
        return ((startPage + blockLimit - 1) < totalPage)? startPage + blockLimit - 1 : totalPage;
    }

    // 서비스에서 받은 페이지 정보를 이용해 프론트로 보낼 Map 얻기
    // 컨트롤러 코드 중복 없애기 위해
    public HashMap<String, Object> getHashMapPage(int blockLimit, Pageable pageable, Page<?> dtoPage, String dtoAlias) {
        int startPage = getStartPage(pageable.getPageNumber(), blockLimit);
        int endPage = getEndPage(startPage, blockLimit, dtoPage.getTotalPages());

        HashMap<String, Object> response = new HashMap<>();
        response.put(dtoAlias, dtoPage);
        response.put("startPage", startPage);
        response.put("endPage", endPage);

        return response;
    }
}
