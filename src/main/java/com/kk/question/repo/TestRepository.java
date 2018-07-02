package com.kk.question.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.kk.question.objects.Question;
import com.kk.question.objects.Test;

public interface TestRepository extends MongoRepository<Test, String>{

	@Query("{_id:?0}")
	Test getTestById(String id);
	
}
