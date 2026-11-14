package com.belval.codigorosa.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.belval.codigorosa.api.model.Curso;
import com.belval.codigorosa.repository.CursoRepository;

@RestController
@RequestMapping("/cursos")
public class CursoController {

    @Autowired
    private CursoRepository cursoRepository;

    // Cadastro de cursos
    //curl -X POST http://localhost:8080/cursos -H "Content-Type: application/json; Charset=utf-8" -d @Curso-java.json 
    @PostMapping
    public ResponseEntity<Curso> criarCurso(@RequestBody Curso curso) {

        curso.setIdCurso(null);

        System.out.println("Chegou: " + curso.toString());

        Curso salvo = cursoRepository.save(curso);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(salvo);
    }
 // Busca um curso pelo ID
    @GetMapping("/{id}")
    public ResponseEntity<?> obterCurso(@PathVariable Integer id) {

        Optional<Curso> optional = cursoRepository.findById(id);

        if (optional.isPresent()) {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(optional.get());
        }

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body("Curso não encontrado!");
    }
 // Lista todos os cursos cadastrados
    @GetMapping
    public ResponseEntity<Iterable<Curso>> listarCursos() {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(cursoRepository.findAll());
    }

	// Atualiza um curso pelo ID
	@PutMapping("/{id}")
	public ResponseEntity<?> atualizarCurso(@PathVariable Integer id, @RequestBody Curso cursoNovo) {

		Optional<Curso> optional = cursoRepository.findById(id);

		if (optional.isEmpty()) {
			return ResponseEntity
					.status(HttpStatus.NOT_FOUND)
					.body("Curso não encontrado!");
		}

		Curso cursoAtual = optional.get();

		// Atualiza os atributos do curso
		// Mantém o ID original.
		cursoAtual.setNome(cursoNovo.getNome());
		cursoAtual.setDescricao(cursoNovo.getDescricao());
		cursoAtual.setCategoria(cursoNovo.getCategoria());
		cursoAtual.setNivel(cursoNovo.getNivel());
		cursoAtual.setStatus(cursoNovo.getStatus());

		cursoRepository.save(cursoAtual);

		return ResponseEntity
				.status(HttpStatus.OK)
				.body("Curso atualizado com sucesso!");
	}

	// Exclui um curso pelo ID
	@DeleteMapping("/{id}")
	public ResponseEntity<String> apagarCurso(@PathVariable Integer id) {

		Optional<Curso> optional = cursoRepository.findById(id);

		if (optional.isEmpty()) {
			return ResponseEntity
					.status(HttpStatus.NOT_FOUND)
					.body("Curso não encontrado!");
		}

		cursoRepository.deleteById(id);

		return ResponseEntity
				.status(HttpStatus.OK)
				.body("Curso apagado com sucesso!");
	}

}

