package com.kk.question;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.kafka.ConcurrentKafkaListenerContainerFactoryConfigurer;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;

import com.kk.question.objects.Option;
import com.kk.question.objects.Question;
import com.kk.question.objects.Question.QuestionType;
import com.kk.question.repo.QuestionRepository;

@SpringBootApplication
public class QuestionRepoApplication extends SpringBootServletInitializer implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(QuestionRepoApplication.class, args);
	}
	
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application){
		
		return application.sources(QuestionRepoApplication.class);
	}
	 
	@Autowired
	private QuestionRepository questionRepository;
	
	@Override
	public void run(String... arg0) throws Exception {

		
	}
}
