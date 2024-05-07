package com.individualproject.ecommercebackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.individualproject.ecommercebackend.model.Rating;

public interface RatingRepository extends JpaRepository<Rating, Long> {

}
