package com.individualproject.ecommercebackend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.individualproject.ecommercebackend.config.JwtTokenProvider;
import com.individualproject.ecommercebackend.dto.AuthResponse;
import com.individualproject.ecommercebackend.dto.SignInRequest;
import com.individualproject.ecommercebackend.dto.SignUpRequest;
import com.individualproject.ecommercebackend.exception.UsernameAlreadyExistException;
import com.individualproject.ecommercebackend.model.User;
import com.individualproject.ecommercebackend.repository.UserRepository;
import com.individualproject.ecommercebackend.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1")
public class AuthController {

    @Autowired
    UserService userService;

    @Autowired
    JwtTokenProvider jwtTokenProvider;


    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> sigininUserHandler(@Valid @RequestBody SignInRequest request) {

        Authentication authentication = userService.signin(request);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        String token = jwtTokenProvider.generateToken(authentication);
	    AuthResponse authResponse= new AuthResponse(token,true);
	    
        return new ResponseEntity<AuthResponse>(authResponse,HttpStatus.OK);
    }

    @PostMapping("/signup")
	public ResponseEntity<AuthResponse> createUserHandler(@Valid @RequestBody SignUpRequest request) throws UsernameAlreadyExistException {

	        Authentication authentication = userService.signup(request);
	        SecurityContextHolder.getContext().setAuthentication(authentication);
	        
	        String token = jwtTokenProvider.generateToken(authentication);
	        AuthResponse authResponse= new AuthResponse(token,true);
			
	        return new ResponseEntity<AuthResponse>(authResponse,HttpStatus.CREATED);
		
	}

    @GetMapping("/test")
    public ResponseEntity<String> sayHello() {
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok("Hi " + username);
    }

}
