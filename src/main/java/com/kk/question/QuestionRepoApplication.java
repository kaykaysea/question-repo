package com.kk.question;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.kk.question.objects.Option;
import com.kk.question.objects.Question;
import com.kk.question.repo.QuestionRepository;

@SpringBootApplication
public class QuestionRepoApplication implements CommandLineRunner{

	public static void main(String[] args) {
		SpringApplication.run(QuestionRepoApplication.class, args);
	}
	
	@Autowired
	private QuestionRepository questionRepository;
	
	@Override
	public void run(String... arg0) throws Exception {
		// TODO Auto-generated method stub
		
		List<Option> optionList1 = new ArrayList<>();
		optionList1.add(new Option("option1 text", false));
		optionList1.add(new Option("option2 text", false));
		optionList1.add(new Option("option3 text", false));
		optionList1.add(new Option("option4 text", true));
		
		questionRepository.save(new Question("question content", optionList1,"Kinematics",Question.Difficulty.MODERATE));
		
		questionRepository.save(new Question("question content of kinematics", optionList1,"Kinematics",Question.Difficulty.MODERATE));
		
		List<Question> questionList = questionRepository.findQuestionsByTopic("Kinematics");
		
		System.out.println("first question saved");
		
		System.out.println("Question 1 content : "+questionList.get(0).getQuestionContent());
		
		System.out.println("Question 2 content : "+questionList.get(1).getQuestionContent());
		
		
	}
}
