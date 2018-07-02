package com.kk.question.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.kk.question.objects.Exam;
import com.kk.question.repo.ExamRepository;

@RestController
@RequestMapping("/exam")
public class ExamController {
	
	private static final Logger logger = LoggerFactory.getLogger(ExamController.class);
	
	@Autowired
	ExamRepository examRepository;
	
	
	@RequestMapping(value="/all", method = RequestMethod.GET)
	public List<Exam> listAllExams(){
		
		return examRepository.findAll();
		
	}
	
	@RequestMapping(value="/add/{examName}", method = RequestMethod.GET)
	public Exam addExam(@PathVariable("examName") String name){
		
		return examRepository.save(new Exam(name));
		
	}

}
