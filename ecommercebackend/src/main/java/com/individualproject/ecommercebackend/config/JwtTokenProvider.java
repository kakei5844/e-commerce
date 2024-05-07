package com.individualproject.ecommercebackend.config;

import java.util.HashSet;

import javax.crypto.SecretKey;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import com.individualproject.ecommercebackend.constants.SecurityConstants;

import java.nio.charset.StandardCharsets;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import org.springframework.security.core.Authentication;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtTokenProvider {

    private SecretKey key=Keys.hmacShaKeyFor(SecurityConstants.JWT_KEY.getBytes());
	
	public String generateToken(Authentication auth) {

        SecretKey key = Keys.hmacShaKeyFor(SecurityConstants.JWT_KEY.getBytes(StandardCharsets.UTF_8));

        String jwt = Jwts.builder().issuer("E-Commerce").subject("JWT Token")
                    .claim("username", auth.getName())
                    .claim("authorities", populateAuthorities(auth.getAuthorities()))
                    .issuedAt(new Date())
                    .expiration(new Date((new Date()).getTime() + 30000000))
                    .signWith(key).compact();
		
		return jwt;	
	}
	
	public String getUsernameFromJwtToken(String jwt) {
		jwt=jwt.substring(7);
		
		Claims claims = Jwts.parser()
                        .verifyWith(key)
                        .build()
                        .parseSignedClaims(jwt)
                        .getPayload();
		String username = String.valueOf(claims.get("username"));
		
		return username;
	}
	
	public String populateAuthorities(Collection<? extends GrantedAuthority> collection) {
		Set<String> auths=new HashSet<>();
		
		for(GrantedAuthority authority:collection) {
			auths.add(authority.getAuthority());
		}
		return String.join(",",auths);
	}
}
