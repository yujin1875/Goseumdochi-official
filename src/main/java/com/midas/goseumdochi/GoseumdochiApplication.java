package com.midas.goseumdochi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

<<<<<<< HEAD
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.CharacterEncodingFilter;

=======
>>>>>>> origin/yujin
@SpringBootApplication
public class GoseumdochiApplication {

	public static void main(String[] args) {
		SpringApplication.run(GoseumdochiApplication.class, args);
	}

<<<<<<< HEAD
	// 모든 HTTP 요청과 응답에 UTF-8인코딩 강제(팝업창에 한글깨져서 추가한 설정)
	@Configuration
	public class WebConfig {

		@Bean
		public CharacterEncodingFilter characterEncodingFilter() {
			CharacterEncodingFilter filter = new CharacterEncodingFilter();
			filter.setEncoding("UTF-8");
			filter.setForceEncoding(true);
			return filter;
		}
	}

=======
>>>>>>> origin/yujin
}
