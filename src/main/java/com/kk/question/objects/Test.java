package com.kk.question.objects;

import java.util.List;

import org.springframework.data.annotation.Id;

public class Test {
	
	@Id
	private String id;
	
	private int noOfQuestions;
	
	private List<String> questionList;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public int getNoOfQuestions() {
		return noOfQuestions;
	}

	public void setNoOfQuestions(int noOfQuestions) {
		this.noOfQuestions = noOfQuestions;
	}

	public List<String> getQuestionList() {
		return questionList;
	}

	public void setQuestionList(List<String> questionList) {
		this.questionList = questionList;
	}
	
	

}
