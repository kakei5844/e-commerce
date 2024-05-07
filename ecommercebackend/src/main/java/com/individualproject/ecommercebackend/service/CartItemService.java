package com.individualproject.ecommercebackend.service;

import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.individualproject.ecommercebackend.model.Cart;
import com.individualproject.ecommercebackend.model.CartItem;
import com.individualproject.ecommercebackend.model.Product;

public interface CartItemService {

    public CartItem createCartItem(CartItem cartItem);
	
	// public void removeCartItem(Long userId,Long cartItemId) throws CartItemException, UserException;
	
	// public CartItem findCartItemById(Long cartItemId) throws CartItemException;

}
