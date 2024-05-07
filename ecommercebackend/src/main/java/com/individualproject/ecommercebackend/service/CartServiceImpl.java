package com.individualproject.ecommercebackend.service;

import java.util.HashSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.individualproject.ecommercebackend.dto.AddCartItemRequest;
import com.individualproject.ecommercebackend.exception.ProductNotFoundException;
import com.individualproject.ecommercebackend.model.Cart;
import com.individualproject.ecommercebackend.model.CartItem;
import com.individualproject.ecommercebackend.model.Product;
import com.individualproject.ecommercebackend.model.User;
import com.individualproject.ecommercebackend.repository.CartRepository;
import com.individualproject.ecommercebackend.repository.ProductRepository;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductService productService;

    @Autowired
    private CartItemService cartItemService;

    @Override
    public Cart createCart(User user) {
        Cart cart = new Cart();
		cart.setUser(user);
        cart.setDiscount(0);
        cart.setTotalDiscountedPrice(0);
        cart.setTotalPrice(0);
        cart.setTotalItem(0);
        cart.setCartItems(new HashSet<>());
		return cartRepository.save(cart);
    }

    @Override
    public String addCartItem(Long userId, AddCartItemRequest request) throws ProductNotFoundException {
        Cart cart = cartRepository.findByUserId(userId);
        Product product = productService.findProductById(request.productId());

        // TODO: update cartItem if already exists

        CartItem cartItem = new CartItem();
        cartItem.setProduct(product);
        cartItem.setCart(cart);
        cartItem.setUserId(userId); // TODO: have use?
        cartItem.setQuantity(request.quantity()); // TODO: must be greater than 0
        cartItem.setSize(request.size());

        cartItem.setPrice(product.getPrice() * request.quantity());
        cartItem.setDiscountedPrice(product.getDiscountedPrice() * request.quantity());

        CartItem createdCartItem = cartItemService.createCartItem(cartItem);
        cart.getCartItems().add(createdCartItem);

        return "Item Add To Cart";
    }

    @Override
    public Cart findUserCart(Long userId) {
        // TODO: to be modified
        Cart cart =	cartRepository.findByUserId(userId);
		int totalPrice=0;
		int totalDiscountedPrice=0;
		int totalItem=0;
        
		for(CartItem cartsItem : cart.getCartItems()) {
			totalPrice+=cartsItem.getPrice();
			totalDiscountedPrice+=cartsItem.getDiscountedPrice();
			totalItem+=cartsItem.getQuantity();
		}
		
		cart.setTotalPrice(totalPrice);
		cart.setTotalItem(cart.getCartItems().size());
		cart.setTotalDiscountedPrice(totalDiscountedPrice);
		cart.setDiscount(totalPrice-totalDiscountedPrice);
		cart.setTotalItem(totalItem);
		
		return cartRepository.save(cart);
    }

}
