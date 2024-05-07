package com.individualproject.ecommercebackend.service;

import org.springframework.security.core.Authentication;

import com.individualproject.ecommercebackend.dto.SignInRequest;
import com.individualproject.ecommercebackend.dto.SignUpRequest;
import com.individualproject.ecommercebackend.model.User;

public interface UserService {

	public Authentication signup(SignUpRequest request);

    public Authentication signin(SignInRequest request);

	public User findUserProfileByJwt(String jwt);
		
}

