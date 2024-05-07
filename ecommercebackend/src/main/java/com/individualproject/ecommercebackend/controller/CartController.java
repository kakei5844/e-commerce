package com.individualproject.ecommercebackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.individualproject.ecommercebackend.dto.AddCartItemRequest;
import com.individualproject.ecommercebackend.dto.ApiResponse;
import com.individualproject.ecommercebackend.exception.ProductNotFoundException;
import com.individualproject.ecommercebackend.model.Cart;
import com.individualproject.ecommercebackend.model.User;
import com.individualproject.ecommercebackend.service.CartService;
import com.individualproject.ecommercebackend.service.UserService;

@RestController
@RequestMapping("/api/v1/cart")
public class CartController {
    
    @Autowired
    UserService userService;

    @Autowired
    CartService cartService;

    @PutMapping("/add")
	public ResponseEntity<ApiResponse> addItemToCart(@RequestBody AddCartItemRequest req, @RequestHeader("Authorization") String jwt) throws UsernameNotFoundException, ProductNotFoundException{
		
		User user = userService.findUserProfileByJwt(jwt);
		
		cartService.addCartItem(user.getId(), req);
		
		ApiResponse res= new ApiResponse("Item Added To Cart Successfully",true);
		
		return new ResponseEntity<ApiResponse>(res,HttpStatus.ACCEPTED);
		
	}

    @GetMapping("/")
	public ResponseEntity<Cart> findUserCartHandler(@RequestHeader("Authorization") String jwt) throws UsernameNotFoundException{
		
		User user=userService.findUserProfileByJwt(jwt);
		
		Cart cart=cartService.findUserCart(user.getId());
		
		return new ResponseEntity<Cart>(cart,HttpStatus.OK);
	}

    // update cart item

    // delete cart item

}
