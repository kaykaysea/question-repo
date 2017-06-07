package com.kk.question.controller;

import java.util.List;
import java.util.regex.Pattern;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.kk.question.constants.Constants;
import com.kk.question.objects.CategoryTag;
import com.kk.question.repo.CategoryTagRepository;

@RestController
@RequestMapping("/categoryTag")
public class CategoryTagController {
	
	@Autowired
	CategoryTagRepository categoryTagRepository;
	
	@Autowired
	MongoTemplate mongoTemplate;
	
	private static final Logger logger = org.slf4j.LoggerFactory.getLogger(CategoryTagController.class);
	
	@RequestMapping(value="/add",method = RequestMethod.POST)
	public ResponseEntity<String> createCategoryTag(@RequestBody List<CategoryTag> categoryTagList ){
		
		categoryTagList.forEach(categoryTag->{
			CategoryTag updatedCategoryTag = processTag(categoryTag);
			categoryTagRepository.save(updatedCategoryTag);
			});
		
	
		return new ResponseEntity<String>("successfully posted the TAG", HttpStatus.CREATED);
	}
	
	
	@RequestMapping(value="/path/{pathValue}",method=RequestMethod.GET)
	public List<CategoryTag> getCategoriesByPath(@PathVariable("pathValue") String path){
		
		List<CategoryTag> categoryTagList;
		String regexPath = ","+path+",";
		
		if(path.equals("head")){
			categoryTagList = categoryTagRepository.findHeadCategories();
			
		}
		
		else{
			
			categoryTagList = categoryTagRepository.findCategoriesByPath(regexPath);
		}
		
		return categoryTagList;
		
	}
	
	@RequestMapping(value="/byParent/{parent}",method=RequestMethod.GET)
	public List<CategoryTag> getCategoryTagsByParent(@PathVariable("parent") String parent){
		
		return categoryTagRepository.findCategoriesByParent(parent); 
		
	}
	
	@RequestMapping(value="/type/{type}",method=RequestMethod.GET)
	public List<CategoryTag> getCategoriesByType(@PathVariable("type") String entity){
		
		//Query query = new 
		List<CategoryTag> categoryList = null;
		if(entity.equalsIgnoreCase("lesson")){
			Pattern lessonPattern = Pattern.compile(Constants.REGEX_PATH_LESSON);
			categoryList = categoryTagRepository.findCategoriesByType(Constants.REGEX_PATH_LESSON);
		}
		
		if(entity.equalsIgnoreCase("topic")){
			
			Pattern topicPattern = Pattern.compile(Constants.REGEX_PATH_TOPIC);
			categoryList = categoryTagRepository.findCategoriesByType(Constants.REGEX_PATH_TOPIC);
		}
		
		
		return categoryList;
	}
	
	
	private CategoryTag processTag(CategoryTag inputCategoryTag){
		
		if(inputCategoryTag.getParent().isEmpty()){
			
			return inputCategoryTag;
			
		}
		else{
			
			CategoryTag parentTag = categoryTagRepository.findCategoryTagById(inputCategoryTag.getParent());
			String parentPath = parentTag.getPath();
			
			if(!parentPath.isEmpty()){
				
				inputCategoryTag.setPath(parentPath.concat(inputCategoryTag.getParent()+","));
			}
			
			else{
				
				inputCategoryTag.setPath(","+parentPath.concat(inputCategoryTag.getParent()+","));
			}
			
			
			return inputCategoryTag;
		}
		
		
	}

}
