package com.pastor.helpdesk.response;

import java.util.List;

import com.pastor.helpdesk.model.Category;

import lombok.Data;

@Data
public class CategoryResponse {
	private List<Category> category;
}
