package com.AccountRentalHub.services.impl;

import com.AccountRentalHub.services.ImageService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.apache.commons.codec.binary.Base64;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ImageServiceImpl implements ImageService {
    private final String apiKey = "ba989a1415e999eb90e1ce712841018a";
    private final String uploadUrl = "https://api.imgbb.com/1/upload";
    @Override
    public String uploadImage(byte[] imageData) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("image", Base64.encodeBase64String(imageData));

        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(body, headers);

        try {
            String response = restTemplate.postForObject(uploadUrl + "?key=" + apiKey, requestEntity, String.class);
            return extractImageUrl(response);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public String extractImageUrl(String response) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode rootNode = objectMapper.readTree(response);

        if (rootNode.has("success") && rootNode.get("success").asBoolean()) {
            JsonNode dataNode = rootNode.get("data");
            if (dataNode != null && dataNode.has("url")) {
                return dataNode.get("url").asText();
            }
        }

        return null;
    }
}
