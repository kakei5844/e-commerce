package com.individualproject.ecommercebackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.individualproject.ecommercebackend.model.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

}
