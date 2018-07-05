package com.kk.question.controller;

import java.util.ArrayList;
import java.util.BitSet;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.kk.question.objects.Question;
import com.kk.question.objects.Test;
import com.kk.question.objects.TestState;
import com.kk.question.repo.QuestionRepository;
import com.kk.question.repo.TestRepository;
import com.kk.question.repo.TestStateRepository;

@RestController
@RequestMapping("/test")
public class TestController {
	
	private static final Logger logger = LoggerFactory.getLogger(TestController.class);
	
	@Autowired
	TestRepository testRepository;
	
	@Autowired
	TestStateRepository testStateRepository;
	
	@Autowired
	QuestionRepository questionRepository;
	
	@RequestMapping("/id/{id}")
	public Test getTestById(@PathVariable("id") String id){
		
		logger.info("inside test controller with id:"+id);
		
		return testRepository.getTestById(id);
		
		
	}
	
	@RequestMapping("/id/{id}/qNo/{qNo}")
	public Question getTestQuestion(@PathVariable("id") String id,@PathVariable("qNo") Integer qNo){
		
		logger.info("fetching question");
		
		List<String> questionIdList = testRepository.getTestById(id).getQuestionList();
		
		Question question =   questionRepository.getQuestionById(questionIdList.get(qNo.intValue()));
		
		return question;
		
		
		
	}
	
	
	@RequestMapping(value="/create",method = RequestMethod.POST)
	public void createTest(@RequestBody Test test){
		
		testRepository.save(test);
		
	}
	
	
	@RequestMapping(value="/{testId}/state")
	public TestState getTestState(@PathVariable("testId") String testId){
		
		String userId = "1234";
		TestState ts = testStateRepository.getTestStateByUserIdtestId(testId,userId);
	
		return ts;
		
	}
	
	@RequestMapping(value="update/{testId}/{qNo}",method=RequestMethod.POST)
	public void updateTestState(@RequestBody List<Boolean> optionList,@PathVariable("testId") String testId,@PathVariable("qNo") int qNo){
		
		TestState ts = testStateRepository.getTestStateByUserIdtestId(testId, "1234");
		List<List<Boolean>> optionsList = ts.getOptionsState();
		optionsList.set(qNo, optionList);
		ts.setOptionsState(optionsList);
		testStateRepository.save(ts);
		
	}

}
