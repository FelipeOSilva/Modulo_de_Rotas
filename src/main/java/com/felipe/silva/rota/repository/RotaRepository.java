package com.felipe.silva.rota.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.felipe.silva.rota.model.Rota;

@Repository
public interface RotaRepository extends MongoRepository<Rota, String>{

}
