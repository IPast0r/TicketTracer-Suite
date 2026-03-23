package com.pastor.helpdesk.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pastor.helpdesk.dao.ICategoryDao;
import com.pastor.helpdesk.model.Category;
import com.pastor.helpdesk.response.CategoryResponseRest;

@Service
public class CategoryServiceImpl implements ICategoryService{

	@Autowired
	private ICategoryDao categoryDao;
	
	@Override
	@Transactional(readOnly = true)
	public ResponseEntity<CategoryResponseRest> search() {
		CategoryResponseRest response = new CategoryResponseRest();
		try {
			List<Category> categories = (List<Category>) categoryDao.findAll();
			response.getCategoryResponse().setCategory(categories);
			response.setMetadata("OK", "00", "Successfull response");
		}catch (Exception e){
			response.setMetadata("KO", "-1", "Error");
			e.getStackTrace();
			return new ResponseEntity<CategoryResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<CategoryResponseRest>(response, HttpStatus.OK);
	}

	@Override
	@Transactional(readOnly = true)
	public ResponseEntity<CategoryResponseRest> searchById(Long id) {
		CategoryResponseRest response = new CategoryResponseRest();
		List<Category> categories = new ArrayList<>();
		
		try {
			Optional<Category> category = categoryDao.findById(id);
			if(category.isPresent()) {
				categories.add(category.get());
				response.getCategoryResponse().setCategory(categories);
				response.setMetadata("OK", "00", "Successfull response");
			}else {
				response.setMetadata("KO", "-1", "Category not found");
				return new ResponseEntity<CategoryResponseRest>(response, HttpStatus.NOT_FOUND);
			}
		}catch (Exception e){
			response.setMetadata("KO", "-1", "Error");
			e.getStackTrace();
			return new ResponseEntity<CategoryResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<CategoryResponseRest>(response, HttpStatus.OK);
	}

	@Override
	@Transactional
	public ResponseEntity<CategoryResponseRest> save(Category category) {
		CategoryResponseRest response = new CategoryResponseRest();
		List<Category> categories = new ArrayList<>();
		
		try {
			Category categorySaved = categoryDao.save(category);
			
			if(null != categorySaved) {
				categories.add(categorySaved);
				response.getCategoryResponse().setCategory(categories);
				response.setMetadata("OK", "00", "Category succesfully saved");
			}else {
				response.setMetadata("KO", "-1", "Category not saved");
				return new ResponseEntity<CategoryResponseRest>(response, HttpStatus.BAD_REQUEST);
			}
		}catch (Exception e){
			response.setMetadata("KO", "-1", "Error");
			e.getStackTrace();
			return new ResponseEntity<CategoryResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<CategoryResponseRest>(response, HttpStatus.OK);
	}

	@Override
	@Transactional
	public ResponseEntity<CategoryResponseRest> update(Category category , Long id) {
		CategoryResponseRest response = new CategoryResponseRest();
		List<Category> categories = new ArrayList<>();
		
		try {
			Optional<Category> categorySearch = categoryDao.findById(id);
			if(categorySearch.isPresent()) {
				
				categorySearch.get().setName(category.getName());
				categorySearch.get().setDescription(category.getDescription());

				Category categoryToUpdate = categoryDao.save(categorySearch.get());
				if(categoryToUpdate != null) {
					categories.add(categoryToUpdate);
					response.getCategoryResponse().setCategory(categories);
					response.setMetadata("OK", "00", "Category succesfully updated");
				}else {
					response.setMetadata("KO", "-1", "Category not updated");
					return new ResponseEntity<CategoryResponseRest>(response, HttpStatus.BAD_REQUEST);

				}
				
			}else {
				response.setMetadata("KO", "-1", "Category not found");
				return new ResponseEntity<CategoryResponseRest>(response, HttpStatus.NOT_FOUND);
			}
		}catch (Exception e){
			response.setMetadata("KO", "-1", "Error");
			e.getStackTrace();
			return new ResponseEntity<CategoryResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<CategoryResponseRest>(response, HttpStatus.OK);
	}

	@Override
	@Transactional
	public ResponseEntity<CategoryResponseRest> deleteById(Long id) {
		CategoryResponseRest response = new CategoryResponseRest();
		try {

			categoryDao.deleteById(id);
			response.setMetadata("OK", "00", "Category succesfully deleted");

		}catch (Exception e){
			response.setMetadata("KO", "-1", "Error deletting category");
			e.getStackTrace();
			return new ResponseEntity<CategoryResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<CategoryResponseRest>(response, HttpStatus.OK);
	}

}
