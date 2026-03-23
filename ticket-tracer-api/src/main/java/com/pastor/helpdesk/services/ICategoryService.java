package com.pastor.helpdesk.services;

import org.springframework.http.ResponseEntity;

import com.pastor.helpdesk.model.Category;
import com.pastor.helpdesk.response.CategoryResponseRest;

public interface ICategoryService {

	public ResponseEntity<CategoryResponseRest> search();
	public ResponseEntity<CategoryResponseRest> searchById(Long id);
	public ResponseEntity<CategoryResponseRest> save(Category category);
	public ResponseEntity<CategoryResponseRest> deleteById(Long id);
	public ResponseEntity<CategoryResponseRest> update(Category category , Long id);

}
