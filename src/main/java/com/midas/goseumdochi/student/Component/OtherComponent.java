package com.midas.goseumdochi.student.Component;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import java.io.IOException;
import java.io.PrintWriter;

@Component
public class OtherComponent {
    // Alert 팝업창 띄우기 함수
    public static void AlertMessage(HttpServletResponse response, String message) throws IOException {
        String script = String.format("<script>alert('%s'); history.go(-1);</script>", message);
        PrintWriter out = response.getWriter();
        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/html; charset=UTF-8");
        out.println(script);
        out.close();
    }
}