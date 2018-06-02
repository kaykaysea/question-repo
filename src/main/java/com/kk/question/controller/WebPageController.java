package com.kk.question.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class WebPageController {
	
	@RequestMapping(value="/home", method=RequestMethod.GET)	
	public String renderHome(Model model){
		
		return "landing";
		
	}
	@RequestMapping(value="/mathJax", method=RequestMethod.GET)	
	public String renderMathJax(Model model){
		
		return "mathJaxText";
		
	}
	
	@RequestMapping(value="/explore", method=RequestMethod.GET)	
	public String renderLanding(Model model){
		
		return "explore";
		
	}
	
	
	@RequestMapping(value="/create", method=RequestMethod.GET)	
	public String renderCreateQuestion(Model model){
		
		return "createQuestion";
		
	}
	
	@RequestMapping(value="/configure", method=RequestMethod.GET)
	public String renderCategories(){
		
		return "configure";
		
	}
	

}
