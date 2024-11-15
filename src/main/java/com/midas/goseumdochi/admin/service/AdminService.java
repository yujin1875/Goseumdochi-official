package com.midas.goseumdochi.admin.service;

import com.midas.goseumdochi.admin.entity.AdminEntity;
import com.midas.goseumdochi.admin.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    private final AdminRepository adminRepository;

    @Autowired
    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public boolean authenticate(String id, String password) {
        AdminEntity admin = adminRepository.findByIdIgnoreCase(id);
        System.out.println("admin: " + admin);
        System.out.println("getPw: " + admin.getPassword());
        if (admin != null && admin.getPassword().equals(password)) {
            return true;
        }
        return false;
    }
}
