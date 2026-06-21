package com.sri.portfolio.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApiResponse {
    private boolean success;
    private String message;

    public static ApiResponse of(boolean success, String message) {
        return new ApiResponse(success, message);
    }
}
