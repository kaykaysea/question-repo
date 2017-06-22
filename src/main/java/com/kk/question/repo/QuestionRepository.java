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
	
	@Query("{_id:?0}")
	Question getQuestionById(String id);
	
	@Query(value="{_id:?0}",delete=true)
	void deleteQuestionById(String id);
	
	@Query("{'head':{$regex : ?0},'lesson':{$regex : ?1},'topic':{$regex : ?2}}")
	List<Question> getQuestionByQuery(String head, String lesson, String topic);
	
}
