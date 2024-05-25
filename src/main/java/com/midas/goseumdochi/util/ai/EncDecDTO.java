package com.midas.goseumdochi.util.ai;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class EncDecDTO {
    private String encrypted_text;
    private String decrypted_text;
}
