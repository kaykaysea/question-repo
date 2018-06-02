package com.kk.question.objects;

import org.springframework.data.annotation.Id;

public class Exam {
	
	@Id
	private String id;
	
	private String name;
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	public Exam(){};
	
	public Exam(String name){
		
		super();
		this.name=name;
		
	}
	
	

}
