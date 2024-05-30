package com.midas.goseumdochi.util.component;

import org.springframework.stereotype.Component;

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
}
