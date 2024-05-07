package com.individualproject.ecommercebackend.controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.individualproject.ecommercebackend.model.Product;
import com.individualproject.ecommercebackend.service.ProductService;

@RestController
@RequestMapping("/admin/api/v1/products")
public class AdminProductController {

    @Autowired
    private ProductService productService;

    @PostMapping("/")
    public ResponseEntity<Product> createProductHandler(@RequestBody Product product) {

        Product createdProduct = productService.createProduct(product);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                                                  .path("/{productId}")
                                                  .buildAndExpand(createdProduct.getId())
                                                  .toUri();
        return ResponseEntity.created(location).body(createdProduct);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Product>> getAllProducts() {

        List<Product> products = productService.getAllProducts();
		
		return new ResponseEntity<>(products, HttpStatus.ACCEPTED);
        
    }

    // update

    // delete
}
