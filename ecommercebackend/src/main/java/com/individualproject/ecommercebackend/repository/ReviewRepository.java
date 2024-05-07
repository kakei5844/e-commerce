package com.individualproject.ecommercebackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.individualproject.ecommercebackend.model.Review;

public interface ReviewRepository extends JpaRepository<Review, Long>  {

}
