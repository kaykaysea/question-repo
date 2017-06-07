package com.kk.question.repo;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.kk.question.objects.Tag;

public interface TagRepository extends MongoRepository<Tag, String> {
	
	
	@Query("{'parent':?0}")
	List<Tag> findListByParent(String parent);
	
	@Query("{'type':?0}")
	List<Tag> findTagsByType(String type);

}
