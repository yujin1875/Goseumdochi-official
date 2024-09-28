package com.midas.goseumdochi.teacher.service;

import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import org.springframework.stereotype.Service;

import java.nio.file.Files;
import java.nio.file.Path;

@Service
public class VideoUploadService {

    private final Storage storage = StorageOptions.getDefaultInstance().getService();

    public void uploadFile(Path filePath, String bucketName, String blobName) throws Exception {
        String fullPath = "video/" + blobName;
        BlobInfo blobInfo = BlobInfo.newBuilder(bucketName, fullPath).build();
        storage.create(blobInfo, Files.readAllBytes(filePath));
    }
}
