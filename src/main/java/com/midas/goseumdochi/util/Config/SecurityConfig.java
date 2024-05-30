package com.midas.goseumdochi.util.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())  // CSRF 보호 비활성화
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/api/student/signup").permitAll()
                        .requestMatchers("/api/academy/form").permitAll()  // 회원가입 엔드포인트 인증 비활성화
                        .requestMatchers("/api/posts/upload").permitAll()  // 커뮤니티 게시글 작성
                        .requestMatchers("/api/posts/list").permitAll()
                        .requestMatchers("/api/posts/categories").permitAll()
                        .requestMatchers("/api/admin/management/students").permitAll()
                        .requestMatchers("/api/admin/management/academy").permitAll()
                        .anyRequest().authenticated()
                );
        return http.build();
    }
}