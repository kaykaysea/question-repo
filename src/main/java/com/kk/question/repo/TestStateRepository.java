package com.kk.question.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.kk.question.objects.Test;
import com.kk.question.objects.TestState;

public interface TestStateRepository extends MongoRepository<TestState, String> {
	
	@Query("{testId:'?0',userId:'?1'}")
	TestState getTestStateByUserIdtestId(String testId,String userId);
	


}
