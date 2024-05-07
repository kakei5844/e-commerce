package com.individualproject.ecommercebackend.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.individualproject.ecommercebackend.exception.ProductNotFoundException;
import com.individualproject.ecommercebackend.model.Category;
import com.individualproject.ecommercebackend.model.Product;
import com.individualproject.ecommercebackend.repository.CategoryRepository;
import com.individualproject.ecommercebackend.repository.ProductRepository;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepo;

    @Autowired
    private CategoryRepository categoryRepo;

    public List<Product> getAllProducts() {
        return productRepo.findAll();
    }

    public Product createProduct(Product product) {

        Category savedCategory = saveThreeCategories(product.getCategory());
        product.setCategory(savedCategory);
        return productRepo.save(product);
    }

    private Category saveThreeCategories(Category thirdCategory) {
        Category savedTopCategory = saveSingleCategory(thirdCategory.getParentCategory().getParentCategory());
        thirdCategory.getParentCategory().setParentCategory(savedTopCategory);

        Category savedSecondCategory = saveSingleCategory(thirdCategory.getParentCategory());
        thirdCategory.setParentCategory(savedSecondCategory);

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

    public Product findProductById(Long id) {
        return productRepo.findById(id).orElseThrow(() -> new ProductNotFoundException("Product with id: " + id + " not found"));
	}

    public List<Product> getProductsWithFilters(String thirdLevelCategoryName, String secondLevelCategoryName,
            String topLevelCategoryName) {
        return productRepo.filterProducts(thirdLevelCategoryName, secondLevelCategoryName, topLevelCategoryName);
    }

    public void deleteProduct(Long productId) throws ProductNotFoundException {
        Product product=findProductById(productId);
        productRepo.delete(product);
        // check if sizes, ratings, reviews are deleted as well
    }

    public Product updateProduct(Long productId,Product newProduct) throws ProductNotFoundException {
        // TODO
        return null;
    }

    	public Page<Product> getProducts(
            String thirdLevelCategoryName, 
            String secondLevelCategoryName, 
            String topLevelCategoryName, 
            List<String> colors, 
			List<String> sizes, 
            Integer minPrice, 
            Integer maxPrice, 
			Integer minDiscount, 
            String sort, 
            String stock, 
            Integer pageNumber, 
            Integer pageSize
        ) {

		Pageable pageable = PageRequest.of(pageNumber, pageSize);
		
		List<Product> products = productRepo.filterProductsNew(thirdLevelCategoryName, secondLevelCategoryName, topLevelCategoryName, minPrice, maxPrice, minDiscount, sort);
		
		
		if (!colors.isEmpty()) {
			products = products.stream()
			        .filter(p -> colors.stream().anyMatch(c -> c.equalsIgnoreCase(p.getColor())))
			        .collect(Collectors.toList());
		
		
		} 

		if(stock!=null) {

			if(stock.equals("in_stock")) {
				products=products.stream().filter(p->p.getQuantity()>0).collect(Collectors.toList());
			}
			else if (stock.equals("out_of_stock")) {
				products=products.stream().filter(p->p.getQuantity()<1).collect(Collectors.toList());				
			}
				
					
		}
		int startIndex = (int) pageable.getOffset();
		int endIndex = Math.min(startIndex + pageable.getPageSize(), products.size());

		List<Product> pageContent = products.subList(startIndex, endIndex);
		Page<Product> filteredProducts = new PageImpl<>(pageContent, pageable, products.size());
	    return filteredProducts;
		
		
	}


}
