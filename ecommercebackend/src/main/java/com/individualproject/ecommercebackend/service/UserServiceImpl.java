package com.individualproject.ecommercebackend.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.individualproject.ecommercebackend.config.CustomUserDetailsService;
import com.individualproject.ecommercebackend.config.JwtTokenProvider;
import com.individualproject.ecommercebackend.dto.SignInRequest;
import com.individualproject.ecommercebackend.dto.SignUpRequest;
import com.individualproject.ecommercebackend.exception.UsernameAlreadyExistException;
import com.individualproject.ecommercebackend.model.User;
import com.individualproject.ecommercebackend.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private CartService cartService;

    @Override
    public Authentication signup(SignUpRequest request) throws UsernameAlreadyExistException {
        String username = request.username();
        String password = passwordEncoder.encode(request.password());
        String firstName = request.firstName();
        String lastName = request.lastName();
        String mobile = request.mobile();

        // Check if user with the given email already exists
        if (userRepository.existsByUsername(username)) {
            throw new UsernameAlreadyExistException("Username already exists");
        }

        // Create new user
        User user = new User();

        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setUsername(username);
        user.setMobile(mobile);
        user.setPassword(password);
        user.setCreatedAt(LocalDateTime.now());
        user.setRole("USER");

        User savedUser = userRepository.save(user);
        cartService.createCart(savedUser);

        UserDetails userDetails = userDetailsService.loadUserByUsername(savedUser.getUsername());

        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }

    @Override
    public Authentication signin(SignInRequest request) throws BadCredentialsException {
        String username = request.username();
        String password = request.password();

        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("Incorrect password");
        }
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }

    @Override
    public User findUserProfileByJwt(String jwt) throws UsernameNotFoundException {
		String username=jwtTokenProvider.getUsernameFromJwtToken(jwt);
		return userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User with username " + username + " not found"));
	}

}
