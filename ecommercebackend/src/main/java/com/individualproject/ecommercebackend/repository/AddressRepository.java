package com.individualproject.ecommercebackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.individualproject.ecommercebackend.model.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {

}
