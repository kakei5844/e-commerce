package com.individualproject.ecommercebackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.individualproject.ecommercebackend.model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

}
