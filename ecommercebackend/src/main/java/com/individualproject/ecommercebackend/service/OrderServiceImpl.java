package com.individualproject.ecommercebackend.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.individualproject.ecommercebackend.enums.OrderStatus;
import com.individualproject.ecommercebackend.exception.OrderNotFoundException;
import com.individualproject.ecommercebackend.model.Address;
import com.individualproject.ecommercebackend.model.Cart;
import com.individualproject.ecommercebackend.model.CartItem;
import com.individualproject.ecommercebackend.model.Order;
import com.individualproject.ecommercebackend.model.OrderItem;
import com.individualproject.ecommercebackend.model.User;
import com.individualproject.ecommercebackend.repository.AddressRepository;
import com.individualproject.ecommercebackend.repository.OrderItemRepository;
import com.individualproject.ecommercebackend.repository.OrderRepository;
import com.individualproject.ecommercebackend.repository.UserRepository;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    CartService cartService;

    @Autowired
    OrderItemRepository orderItemRepository;

    @Autowired
    OrderRepository orderRepository;

    @Override
    public Order createOrder(User user, Address shippingAddress) {
        shippingAddress.setUser(user);
        Address address= addressRepository.save(shippingAddress);
		user.getAddresses().add(address);
		userRepository.save(user);

        Cart cart = cartService.findUserCart(user.getId());
		List<OrderItem> orderItems=new ArrayList<>();
		
		for(CartItem item: cart.getCartItems()) {
			OrderItem orderItem=new OrderItem();
			
			orderItem.setPrice(item.getPrice());
			orderItem.setProduct(item.getProduct());
			orderItem.setQuantity(item.getQuantity());
			orderItem.setSize(item.getSize());
			orderItem.setUserId(item.getUserId());
			orderItem.setDiscountedPrice(item.getDiscountedPrice());
			
			OrderItem createdOrderItem = orderItemRepository.save(orderItem);
			
			orderItems.add(createdOrderItem);
		}

        Order createdOrder = new Order();
		createdOrder.setUser(user);
		createdOrder.setOrderItems(orderItems);
		createdOrder.setTotalPrice(cart.getTotalPrice());
		createdOrder.setTotalDiscountdPrice(cart.getTotalDiscountedPrice());
		createdOrder.setDiscount(cart.getDiscount());
		createdOrder.setTotalItem(cart.getTotalItem());
		
		createdOrder.setShippingAddress(address);
		createdOrder.setOrderDate(LocalDateTime.now());
		createdOrder.setOrderStatus(OrderStatus.PENDING);
        createdOrder.setCreatedAt(LocalDateTime.now());
		
		Order savedOrder = orderRepository.save(createdOrder);
		
		for(OrderItem item: orderItems) {
			item.setOrder(savedOrder);
			orderItemRepository.save(item);
		}
		
		return savedOrder;
    }

    @Override
    public Order findOrderById(Long orderId) throws OrderNotFoundException {
        return orderRepository.findById(orderId).orElseThrow(() -> new OrderNotFoundException("Order with id: " + orderId + " not found"));
    }

    @Override
    public List<Order> usersOrderHistory(Long userId) {
        List<Order> orders=orderRepository.getUsersOrders(userId);
		return orders;
    }

    @Override
    public Order placedOrder(Long orderId) throws OrderNotFoundException {
        Order order=findOrderById(orderId);
		order.setOrderStatus(OrderStatus.PLACED);
		return order;
    }

    @Override
    public Order confirmedOrder(Long orderId) throws OrderNotFoundException {
        Order order = findOrderById(orderId);
		order.setOrderStatus(OrderStatus.CONFIRMED);
        return orderRepository.save(order);
    }

    @Override
    public Order shippedOrder(Long orderId) throws OrderNotFoundException {
        Order order=findOrderById(orderId);
		order.setOrderStatus(OrderStatus.SHIPPED);
		return orderRepository.save(order);
    }

    @Override
    public Order deliveredOrder(Long orderId) throws OrderNotFoundException {
        Order order=findOrderById(orderId);
		order.setOrderStatus(OrderStatus.DELIVERED);
		return orderRepository.save(order);
    }

    @Override
    public Order cancledOrder(Long orderId) throws OrderNotFoundException {
        Order order=findOrderById(orderId);
		order.setOrderStatus(OrderStatus.CANCELLED);
		return orderRepository.save(order);
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public void deleteOrder(Long orderId) throws OrderNotFoundException {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteOrder'");
    }

}
