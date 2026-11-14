// Camada de acesso à API REST de cursos.
// Cada função faz uma única chamada HTTP e lança erro se o status não for o esperado.

const API_URL = 'http://localhost:8080/cursos';

async function lerErro(resposta) {
  let detalhe = '';
  try {
    detalhe = await resposta.text();
  } catch (e) {
    detalhe = '';
  }
  return new Error('Erro ' + resposta.status + (detalhe ? ': ' + detalhe : ''));
}

export async function listarCursos() {

    console.log('Aqui...');
  /*
  const resposta = await fetch(API_URL);
  if (!resposta.ok) {
    throw await lerErro(resposta);
  }
  return resposta.json();
  */

  return [
        {
            id: 1,
            nome: 'Java',
            descricao: 'Curso de Java Basico',
            preco: 1.23,
            dataCriacao: '01/01/2026'
        }
    ];
}

export async function buscarCurso(id) {
  const resposta = await fetch(API_URL + '/' + id);
  if (!resposta.ok) {
    throw await lerErro(resposta);
  }
  return resposta.json();
}

export async function criarCurso(curso) {
  const resposta = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(curso)
  });
  if (resposta.status !== 201) {
    throw await lerErro(resposta);
  }
}

export async function atualizarCurso(id, curso) {
  const resposta = await fetch(API_URL + '/' + id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(curso)
  });
  if (!resposta.ok) {
    throw await lerErro(resposta);
  }
}

export async function apagarCurso(id) {
  const resposta = await fetch(API_URL + '/' + id, {
    method: 'DELETE'
  });
  if (!resposta.ok) {
    throw await lerErro(resposta);
  }
}
