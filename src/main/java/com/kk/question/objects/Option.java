package com.kk.question.objects;

import org.springframework.data.mongodb.core.mapping.Field;

public class Option {
	
	private String optionText;
	
	@Field("isAnswer")
	private boolean isAnswer;

	public Option(String optionText, boolean isAnswer) {
		super();
		this.optionText = optionText;
		this.isAnswer = isAnswer;
	}
	
	public Option(){}

	public String getOptionText() {
		return optionText;
	}

	public void setOptionText(String optionText) {
		this.optionText = optionText;
	}

	public boolean getIsAnswer() {
		return isAnswer;
	}

	public void setIsAnswer(boolean isAnswer) {
		this.isAnswer = isAnswer;
	}

}
