package com.felipe.silva.rota.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import com.felipe.silva.rota.model.Rota;
import com.felipe.silva.rota.repository.RotaRepository;

@Service
public class RotaService {

	@Autowired
	MongoTemplate mongoTemplate;

	@Autowired
	RotaRepository rotaRepository;

	public List<Rota> findAll() {
		return mongoTemplate.findAll(Rota.class);
	}

	public Rota save(Rota rota) {
		return rotaRepository.save(rota);
	}

	public Rota findById(String rota_id) {
		return mongoTemplate.findOne(new Query(Criteria.where("_id").is(rota_id)), Rota.class);
	}

	public void deleteRota(String rota_id) {
		mongoTemplate.remove(new Query(Criteria.where("_id").is(rota_id)), Rota.class);
	}

	public void saveRota(Rota rota) {
		mongoTemplate.insert(rota);
	}
}
