package com.kk.question.objects;

import org.springframework.data.annotation.Id;

public class Tag {
	
	@Id
	private String id;
	
	
	private String parent;
	
	private String type;

	public Tag(String id, String parent, String type) {
		super();
		this.id = id;
		this.parent = parent;
		this.type = type;
	}
	
	public Tag(){}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getParent() {
		return parent;
	}

	public void setParent(String parent) {
		this.parent = parent;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	
	
	

}
