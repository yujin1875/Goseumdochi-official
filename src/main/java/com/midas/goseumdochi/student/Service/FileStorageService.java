package com.midas.goseumdochi.student.Service;

import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Service
public class FileStorageService {

    private final String bucketName = "goseumdochi_files"; // GCS 버킷 이름
    private final Storage storage = StorageOptions.getDefaultInstance().getService();

    // 파일 유형별로 폴더를 구분하여 파일을 업로드
    public String uploadFile(MultipartFile file, String folder) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalStateException("업로드할 파일이 없습니다.");
        }
        String originalFilename = file.getOriginalFilename();
        String blobId = folder + "/" + UUID.randomUUID().toString() + "-" + originalFilename; // 폴더 경로 추가
        BlobId blobInfo = BlobId.of(bucketName, blobId);
        Blob blob = storage.create(BlobInfo.newBuilder(blobInfo).build(), file.getBytes());

        return blob.getMediaLink(); // 업로드된 파일의 URL 반환
    }
}
