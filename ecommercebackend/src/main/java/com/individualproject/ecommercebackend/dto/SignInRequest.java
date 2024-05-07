package com.individualproject.ecommercebackend.dto;

import jakarta.validation.constraints.NotBlank;

public record SignInRequest(@NotBlank(message = "username must not be blank") String username, @NotBlank(message = "password must not be blank") String password) {

}
