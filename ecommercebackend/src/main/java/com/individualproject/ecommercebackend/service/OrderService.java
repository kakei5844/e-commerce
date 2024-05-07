package com.individualproject.ecommercebackend.service;

import java.util.List;

import com.individualproject.ecommercebackend.exception.OrderNotFoundException;
import com.individualproject.ecommercebackend.model.Address;
import com.individualproject.ecommercebackend.model.Order;
import com.individualproject.ecommercebackend.model.User;

public interface OrderService {

    public Order createOrder(User user, Address shippingAdress);
	
	public Order findOrderById(Long orderId) throws OrderNotFoundException;
	
	public List<Order> usersOrderHistory(Long userId);
	
	public Order placedOrder(Long orderId) throws OrderNotFoundException;
	
	public Order confirmedOrder(Long orderId)throws OrderNotFoundException;
	
	public Order shippedOrder(Long orderId) throws OrderNotFoundException;
	
	public Order deliveredOrder(Long orderId) throws OrderNotFoundException;
	
	public Order cancledOrder(Long orderId) throws OrderNotFoundException;
	
	public List<Order>getAllOrders();
	
	public void deleteOrder(Long orderId) throws OrderNotFoundException;
}
