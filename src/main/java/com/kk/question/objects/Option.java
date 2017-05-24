package com.kk.question.objects;

public class Option {
	
	private String optionText;
	
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

	public boolean isAnswer() {
		return isAnswer;
	}

	public void setAnswer(boolean isAnswer) {
		this.isAnswer = isAnswer;
	}

}
