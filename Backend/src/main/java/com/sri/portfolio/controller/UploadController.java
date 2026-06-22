package com.sri.portfolio.controller;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

@RestController
@RequestMapping("/api/upload")
public class UploadController {

    @Autowired
    private Cloudinary cloudinary;

    @PostMapping("/image")
    public ResponseEntity<?> uploadImage(
            @RequestParam("file") MultipartFile file) {

        if (file.isEmpty()) {
            return ResponseEntity
                    .badRequest()
                    .body("File is empty");
        }

        try {

            Map<?, ?> uploadResult =
                    cloudinary.uploader()
                               .upload(
                                   file.getBytes(),
                                   ObjectUtils.emptyMap()
                               );

            String fileUrl =
                    uploadResult.get("secure_url")
                                .toString();

            return ResponseEntity.ok(
                    new UploadResponse(fileUrl));

        } catch (IOException e) {

            return ResponseEntity
                    .internalServerError()
                    .body("Upload failed: " + e.getMessage());
        }
    }

    private static class UploadResponse {

        private final String url;

        public UploadResponse(String url) {
            this.url = url;
        }

        public String getUrl() {
            return url;
        }
    }
}