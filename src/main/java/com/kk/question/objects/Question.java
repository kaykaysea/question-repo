package com.kk.question.objects;

import java.util.List;

import org.springframework.data.annotation.Id;

public class Question {
	
	@Id
	private String id;
	
	private String head;
	
	private String lesson;
	
	private String topic;
	
	private String syllabus;
	
	private String exam;
	
	private String year;
	
	private String questionContent;
	
	private List<Option> optionList;
	
	private String diagramRef;
	
	private QuestionType questionType;
	
	public enum QuestionType{
		SINGLE,MULTIPLE,RA,COMPREHENSION,MATCHING,INT
	}
	
	private String solutionDiagramRef;
		
	private Difficulty difficulty;
	
	public enum Difficulty{
		EASY,MODERATE,DIFFICULT,VERYDIFFICULT
		
	};
	
	public Question(){};

	public Question(String head, String lesson, String topic, String syllabus, String exam, String year, String questionContent,
			List<Option> optionList, String diagramRef, QuestionType questionType, String solutionDiagramRef,
			Difficulty difficulty) {
		super();
		this.head = head;
		this.lesson = lesson;
		this.topic = topic;
		this.syllabus = syllabus;
		this.exam = exam;
		this.year=year;
		this.questionContent = questionContent;
		this.optionList = optionList;
		this.diagramRef = diagramRef;
		this.questionType = questionType;
		this.solutionDiagramRef = solutionDiagramRef;
		this.difficulty = difficulty;
	}


	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getHead() {
		return head;
	}


	public String getLesson() {
		return lesson;
	}


	public String getSyllabus() {
		return syllabus;
	}


	public String getExam() {
		return exam;
	}


	public String getDiagramRef() {
		return diagramRef;
	}


	public QuestionType getQuestionType() {
		return questionType;
	}


	public String getSolutionDiagramRef() {
		return solutionDiagramRef;
	}


	public void setHead(String head) {
		this.head = head;
	}


	public void setLesson(String lesson) {
		this.lesson = lesson;
	}


	public void setSyllabus(String syllabus) {
		this.syllabus = syllabus;
	}


	public void setExam(String exam) {
		this.exam = exam;
	}


	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	public void setDiagramRef(String diagramRef) {
		this.diagramRef = diagramRef;
	}


	public void setQuestionType(QuestionType questionType) {
		this.questionType = questionType;
	}


	public void setSolutionDiagramRef(String solutionDiagramRef) {
		this.solutionDiagramRef = solutionDiagramRef;
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
	
	public void updateQuestion(Question inQuestion){
		
		this.questionContent = inQuestion.getQuestionContent();
		this.head = inQuestion.getHead();
		this.lesson = inQuestion.getLesson();
		this.topic = inQuestion.getTopic();
		this.optionList = inQuestion.getOptionList();
		this.questionType = inQuestion.getQuestionType();
		this.difficulty = inQuestion.getDifficulty();
		this.exam = inQuestion.getExam();
		this.year = inQuestion.getYear();
		this.syllabus = inQuestion.getSyllabus();
		
	}
	

}
