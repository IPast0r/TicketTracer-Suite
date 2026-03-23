package com.pastor.helpdesk.dao;

import org.springframework.data.repository.CrudRepository;

import com.pastor.helpdesk.model.Category;

public interface ICategoryDao extends CrudRepository<Category, Long>{

}
