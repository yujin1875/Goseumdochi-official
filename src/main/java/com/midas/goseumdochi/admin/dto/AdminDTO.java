package com.midas.goseumdochi.admin.dto;

public class AdminDTO {
    private String id;
    private String password;

    private String username;

    public AdminDTO() {
    }

    public AdminDTO(String id, String password) {
        this.id = id;
        this.password = password;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }



    public AdminDTO(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }
}
