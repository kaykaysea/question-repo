package com.kk.question.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.kk.question.objects.Question;
import com.kk.question.repo.QuestionRepository;

@RestController
@RequestMapping("/question")
public class QuestionController {
	
	private static final Logger logger = LoggerFactory.getLogger(QuestionController.class);
	
	@Autowired
	QuestionRepository questionRepository;
	
	
	
	@RequestMapping(value="/all", method = RequestMethod.GET)
	public List<Question> listAllQuestions()
	{
		
		logger.info("GET request for all the questions");
		return questionRepository.findAll();
		
	}
	
	
	@RequestMapping(value="/byHead/{head}", method = RequestMethod.GET)
	public List<Question> listQuestionsByHead(@PathVariable("head") String head){
		
		logger.info("GETting list of questions for head :"+ head);
		
		return questionRepository.findQuestionsbyHead(head);
		
	}
	
	@RequestMapping(value="/byTopic/{topic}", method = RequestMethod.GET)
	public List<Question> listQuestionsByTopic(@PathVariable("topic") String topic){
		
		logger.info("GETting list of questions for topic :"+ topic);
		
		return questionRepository.findQuestionsByTopic(topic);
		
	}
	
	@RequestMapping(value="/add",method = RequestMethod.POST)
	public ResponseEntity<String> addQuestion(@RequestBody Question question){
		
		questionRepository.save(question);
		
		logger.info("successfully saved the Question"+question);
		
		return new ResponseEntity<>(HttpStatus.CREATED);
		
	}
	
	
}
