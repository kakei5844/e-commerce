package com.individualproject.ecommercebackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.individualproject.ecommercebackend.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT p FROM Product p " +
	        "WHERE (p.category.name = :thirdLevelCategoryName " + 
            "AND p.category.parentCategory.name = :secondLevelCategoryName " +
            "AND p.category.parentCategory.parentCategory.name = :topLevelCategoryName)")
	List<Product> filterProducts(
	        @Param("thirdLevelCategoryName") String thirdLevelCategoryName,
            @Param("secondLevelCategoryName") String secondLevelCategoryName,
            @Param("topLevelCategoryName") String topLevelCategoryName
			);

    @Query("SELECT p FROM Product p " +
    "WHERE (p.category.name = :thirdLevelCategoryName " + 
    "AND p.category.parentCategory.name = :secondLevelCategoryName " +
    "AND p.category.parentCategory.parentCategory.name = :topLevelCategoryName) " +
    "AND ((:minPrice IS NULL AND :maxPrice IS NULL) OR (p.discountedPrice BETWEEN :minPrice AND :maxPrice)) " +
    "AND (:minDiscount IS NULL OR p.discountPercent >= :minDiscount) " +
    "ORDER BY " +
    "CASE WHEN :sort = 'price_low' THEN p.discountedPrice END ASC, " +
    "CASE WHEN :sort = 'price_high' THEN p.discountedPrice END DESC")
    List<Product> filterProductsNew(
        @Param("thirdLevelCategoryName") String thirdLevelCategoryName,
        @Param("secondLevelCategoryName") String secondLevelCategoryName,
        @Param("topLevelCategoryName") String topLevelCategoryName, 
        @Param("minPrice") Integer minPrice,
        @Param("maxPrice") Integer maxPrice,
        @Param("minDiscount") Integer minDiscount,
        @Param("sort") String sort
    );

}
