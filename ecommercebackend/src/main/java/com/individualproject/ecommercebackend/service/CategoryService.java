package com.individualproject.ecommercebackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.individualproject.ecommercebackend.model.Category;
import com.individualproject.ecommercebackend.repository.CategoryRepository;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepo;

    public Category saveThreeCategoryLevels(Category thirdCategory) {
        saveSingleCategory(thirdCategory.getParentCategory().getParentCategory());
        saveSingleCategory(thirdCategory.getParentCategory());
        return saveSingleCategory(thirdCategory);
    }

    private Category saveSingleCategory(Category category) {

        String grandparentCategoryName = null;
        String parentCategoryName = null;

        if (category.getLevel() == 3) {
            grandparentCategoryName = category.getParentCategory().getParentCategory().getName();
            parentCategoryName = category.getParentCategory().getName();
        } else if (category.getLevel() == 2) {
            parentCategoryName = category.getParentCategory().getName();
        }

        Category alreadyExistCategory = categoryRepo.isCategoryExist(
                                                category.getName(), 
                                                category.getLevel(), 
                                                parentCategoryName,
                                                grandparentCategoryName);
        if (alreadyExistCategory != null) {
            return alreadyExistCategory;
        } else {
            return categoryRepo.save(category);
        }
    }

}
