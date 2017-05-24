package com.kk.question.objects;

import java.util.List;

import org.springframework.data.annotation.Id;

public class Question {
	
	@Id
	private String id;
	
	private String questionContent;
	
	private List<Option> optionList;
	
	private String topic;
	
	private Difficulty difficulty;
	
	public enum Difficulty{
		EASY,MODERATE,DIFFICULT,VERYDIFFICULT
		
	};

	public Question(String questionContent, List<Option> optionList, String topic,Difficulty difficulty) {
		super();
		this.questionContent = questionContent;
		this.optionList = optionList;
		this.difficulty = difficulty;
		this.topic = topic;
	}

	public String getQuestionContent() {
		return questionContent;
	}

	public void setQuestionContent(String questionContent) {
		this.questionContent = questionContent;
	}

	public List<Option> getOptionList() {
		return optionList;
	}

	public void setOptionList(List<Option> optionList) {
		this.optionList = optionList;
	}

	public String getTopic() {
		return topic;
	}

	public void setTopic(String topic) {
		this.topic = topic;
	}

	public Difficulty getDifficulty() {
		return difficulty;
	}

	public void setDifficulty(Difficulty difficulty) {
		this.difficulty = difficulty;
	}
	
	
	

}
