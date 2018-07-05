package com.kk.question.objects;

import java.util.List;

import org.springframework.data.annotation.Id;

public class TestState {
	
	@Id
	private String id;
	private String testId;
	private String userId;
	private List<List<Boolean>> optionsState;
	private int noOfQuestions;
	private String timeStamp;
	public int activeQNo;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getTestId() {
		return testId;
	}
	public void setTestId(String testId) {
		this.testId = testId;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public List<List<Boolean>> getOptionsState() {
		return optionsState;
	}
	public void setOptionsState(List<List<Boolean>> optionsState) {
		this.optionsState = optionsState;
	}
	public int getNoOfQuestions() {
		return noOfQuestions;
	}
	public void setNoOfQuestions(int noOfQuestions) {
		this.noOfQuestions = noOfQuestions;
	}
	public String getTimeStamp() {
		return timeStamp;
	}
	public void setTimeStamp(String timeStamp) {
		this.timeStamp = timeStamp;
	}
	public int getActiveQNo() {
		return activeQNo;
	}
	public void setActiveQNo(int activeQNo) {
		this.activeQNo = activeQNo;
	}
	
	

}
