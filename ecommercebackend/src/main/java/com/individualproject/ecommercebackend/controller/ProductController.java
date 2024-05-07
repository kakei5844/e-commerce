package com.individualproject.ecommercebackend.controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Page;

import com.individualproject.ecommercebackend.model.Product;
import com.individualproject.ecommercebackend.service.ProductService;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable("id") Long id) {
        Product product = productService.findProductById(id);
        return new ResponseEntity<Product>(product,HttpStatus.ACCEPTED);
    }

    @GetMapping("/filters")
    public ResponseEntity<List<Product>> getProductsWithFilters(
        @RequestParam String thirdLevelCategoryName,
        @RequestParam String secondLevelCategoryName,
        @RequestParam String topLevelCategoryName
    ) {

        List<Product> products = productService.getProductsWithFilters(thirdLevelCategoryName, secondLevelCategoryName, topLevelCategoryName);
		
		return new ResponseEntity<>(products, HttpStatus.ACCEPTED);
        
    }

    @GetMapping("/")
    public ResponseEntity<Page<Product>> findProductByCategoryHandler(
        @RequestParam String thirdLevelCategoryName,
        @RequestParam String secondLevelCategoryName,
        @RequestParam String topLevelCategoryName,
        @RequestParam List<String> color, 
        @RequestParam List<String> size, 
        @RequestParam Integer minPrice,
		@RequestParam Integer maxPrice, 
        @RequestParam Integer minDiscount, 
        @RequestParam String sort, 
        @RequestParam String stock, 
        @RequestParam Integer pageNumber, 
        @RequestParam Integer pageSize
    ){
		Page<Product> res= productService.getProducts(thirdLevelCategoryName, secondLevelCategoryName, topLevelCategoryName, color, size, minPrice, maxPrice, minDiscount, sort,stock,pageNumber,pageSize);
		
		System.out.println("complete products");
		return new ResponseEntity<>(res,HttpStatus.ACCEPTED);
		
	}
    

    // search
		
}
