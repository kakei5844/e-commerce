package com.individualproject.ecommercebackend.service;

import com.individualproject.ecommercebackend.dto.AddCartItemRequest;
import com.individualproject.ecommercebackend.exception.ProductNotFoundException;
import com.individualproject.ecommercebackend.model.Cart;
import com.individualproject.ecommercebackend.model.User;

public interface CartService {

    public Cart createCart(User user);
	
	public String addCartItem(Long userId, AddCartItemRequest request) throws ProductNotFoundException;
	
	public Cart findUserCart(Long userId);

}
