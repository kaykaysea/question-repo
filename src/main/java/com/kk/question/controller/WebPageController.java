package com.kk.question.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class WebPageController {
	
	@RequestMapping(value="/home", method=RequestMethod.GET)	
	public String renderHome(Model model){
		
		return "home";
		
	}
	
	@RequestMapping(value="/create", method=RequestMethod.GET)	
	public String renderCreateQuestion(Model model){
		
		return "create";
		
	}
	

}
