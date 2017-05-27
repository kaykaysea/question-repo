package com.kk.question.repo;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.kk.question.objects.Question;

public interface QuestionRepository extends MongoRepository<Question, String> {
	
	@Query("{'topic':?0}")
	List<Question> findQuestionsByTopic(String topic);
	
	@Query("{'head':?0}")
	List<Question> findQuestionsbyHead(String head);

}
