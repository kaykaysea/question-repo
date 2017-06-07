package com.kk.question.objects;

import org.springframework.data.annotation.Id;

public class CategoryTag {
	
	@Id
	private String id;
	
	private String parent;
	
	private String path;

	public CategoryTag(String id, String parent, String path) {
		super();
		this.id = id;
		this.path = path;
	}
	
	public CategoryTag(){}

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


	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}
	
	
	

}
