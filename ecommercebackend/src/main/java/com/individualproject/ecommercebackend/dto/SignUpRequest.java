package com.individualproject.ecommercebackend.dto;

import jakarta.validation.constraints.NotBlank;

public record SignUpRequest(
    @NotBlank(message = "First name must not be blank") String firstName, 
    @NotBlank(message = "Last name must not be blank") String lastName, 
    @NotBlank(message = "password must not be blank") String password, 
    @NotBlank(message = "username must not be blank") String username, 
    @NotBlank(message = "Phone number must not be blank") String mobile) {

}
