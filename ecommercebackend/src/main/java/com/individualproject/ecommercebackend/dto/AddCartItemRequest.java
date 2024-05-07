package com.individualproject.ecommercebackend.dto;

public record AddCartItemRequest(
    Long productId, 
    String size, 
    int quantity) {

}
