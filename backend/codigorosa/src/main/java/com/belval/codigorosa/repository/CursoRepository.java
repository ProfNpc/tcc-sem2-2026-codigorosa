package com.belval.codigorosa.repository; 

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.belval.codigorosa.api.model.Curso; 

@Repository 
public interface CursoRepository extends CrudRepository<Curso, Integer> { 
	// O CrudRepository ja fornece: save, saveAll, findById, 
	// findAll, delete, deleteById, count, existsById. 

	 // Busca cursos pelo nome informado
    List<Curso> findByNomeContainingIgnoreCase(String nome);

    // Busca cursos por uma categoria específica
    List<Curso> findByCategoriaIgnoreCase(String categoria);

    // Verifica se já existe um curso com aquele nome
    boolean existsByNome(String nome);

}