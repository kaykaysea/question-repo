package com.kk.question.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.kk.question.objects.Tag;
import com.kk.question.repo.TagRepository;

@RestController
@RequestMapping("/tag")
public class TagController {
	
	@Autowired
	TagRepository tagRepository;
	
	
	@RequestMapping(value="/parent/{parent}", method = RequestMethod.GET)
	public List<Tag> getEntitiesByParent(@PathVariable("parent") String parent){
		
		return tagRepository.findListByParent(parent);
		
	
		
	}
	
	@RequestMapping(value="/type/{type}", method = RequestMethod.GET)
	public List<Tag> getTagsByType(@PathVariable("type") String type){
		
		return tagRepository.findTagsByType(type);
		
	}
	
	
	@RequestMapping(value="/add", method = RequestMethod.POST)
	public ResponseEntity<String> insertEntitytoParent(@RequestBody Tag tag){
		
		tagRepository.save(tag);
		
		return new ResponseEntity<>(HttpStatus.CREATED);
		
	}
	
	
	

}
