package com.AccountRentalHub.services;

import com.fasterxml.jackson.core.JsonProcessingException;

public interface ImageService {
    String uploadImage(byte[] imageData);
    String extractImageUrl(String response) throws JsonProcessingException;
}
