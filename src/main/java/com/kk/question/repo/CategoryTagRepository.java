package com.kk.question.repo;

import java.util.List;
import java.util.regex.Pattern;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.kk.question.objects.CategoryTag;

public interface CategoryTagRepository extends MongoRepository<CategoryTag, String> {
	
	
	@Query("{'path': {$regex : ?0}}")
	List<CategoryTag> findCategoriesByPath(String path);
	
	@Query("{'path':''}")
	List<CategoryTag> findHeadCategories();
	
	@Query("{'_id':?0}")
	CategoryTag findCategoryTagById(String id);
	
	@Query("{'parent':?0}")
	List<CategoryTag> findCategoriesByParent(String parent);
	
	@Query("{'path': {$regex : ?0}}")
	List<CategoryTag> findCategoriesByType(String type);
	
	
}
