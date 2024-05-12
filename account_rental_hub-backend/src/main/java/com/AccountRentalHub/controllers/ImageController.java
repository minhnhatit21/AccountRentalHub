package com.AccountRentalHub.controllers;

import com.AccountRentalHub.services.ImageService;
import com.AccountRentalHub.services.impl.ImageServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/uploadImage")
public class ImageController {

    @Autowired
    ImageService imageService;

        @PostMapping("/upload")
        public ResponseEntity<String> uploadImage(@RequestPart("image") MultipartFile file) {
            try {
                String imageUrl = imageService.uploadImage(file.getBytes());
                if (imageUrl != null) {
                    return ResponseEntity.ok(imageUrl);
                } else {
                    return ResponseEntity.badRequest().body("Failed to upload image");
                }
            } catch (IOException e) {
                return ResponseEntity.badRequest().body("Failed to read image file");
            }
        }
}
