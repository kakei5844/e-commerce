package com.individualproject.ecommercebackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.individualproject.ecommercebackend.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

//     @Query("SELECT c FROM Category c WHERE c.name=:name AND c.level=:level " + 
//             "AND ((c.level = 1) " + 
//             "OR (c.level = 2 AND c.parentCategory.name = :parentCategoryName) " + 
//             "OR (:level = 3 AND c.parentCategory.name = :parentCategoryName AND c.parentCategory.parentCategory.name = :grandparentCategoryName))")
//     Category isCategoryExist(
//         @Param("name") String name, 
//         @Param("level") int level, 
//         @Param("parentCategoryName") String parentCategory,
//         @Param("grandparentCategoryName") String grandParentCategory);

        @Query("SELECT c FROM Category c LEFT JOIN c.parentCategory pc1 LEFT JOIN pc1.parentCategory pc2 " +
        "WHERE c.name = :name AND c.level = :level " +
        "AND (:level = 1 OR (c.level = 2 AND COALESCE(pc1.name, '') = :parentCategoryName) " +
        "OR (c.level = 3 AND COALESCE(pc1.name, '') = :parentCategoryName AND COALESCE(pc2.name, '') = :grandparentCategoryName))")
        Category isCategoryExist(
        @Param("name") String name, 
        @Param("level") int level, 
        @Param("parentCategoryName") String parentCategoryName,
        @Param("grandparentCategoryName") String grandParentCategoryName);

}
