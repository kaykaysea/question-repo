package com.kk.question.repo;

import java.io.Serializable;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.kk.question.objects.Exam;

public interface ExamRepository extends MongoRepository<Exam, String> {


	
}
