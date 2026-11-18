import { useState } from 'react';
// Ajuste o caminho abaixo conforme o nome/pasta do seu arquivo de serviço
import { criarCurso } from '../services/cursoService'; 

function NovoCurso() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [nivel, setNivel] = useState('basico');
  const [categoria, setCategoria] = useState('');
  
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setErro('');
    setSucesso(false);
    setCarregando(true);

    const novoCurso = {
      nome,
      descricao,
      nivel,
      // Converte para número inteiro, já que o input é type="number"
      categoria: Number(categoria) 
    };

    try {
      await criarCurso(novoCurso);
      setSucesso(true);
      
      // Limpa os campos após o cadastro
      setNome('');
      setDescricao('');
      setNivel('basico');
      setCategoria('');
    } catch (error) {
      setErro(error.message || 'Erro ao cadastrar o curso.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main>
      <section>
        <h2>Cadastrar Novo Curso</h2>
        <p>Preencha os dados abaixo para adicionar um curso.</p>

        {erro && <p style={{ color: 'red' }}>{erro}</p>}
        {sucesso && <p style={{ color: 'green' }}>Curso cadastrado com sucesso!</p>}

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nome">Nome do curso:</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              disabled={carregando}
              required
            />
          </div>

          <div>
            <label htmlFor="descricao">Descrição:</label>
            <input
              type="text"
              id="descricao"
              name="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              disabled={carregando}
              required
            />
          </div>

          <div>
            <label htmlFor="nivel">Nível:</label>
            <select
              id="nivel"
              name="nivel"
              value={nivel}
              onChange={(e) => setNivel(e.target.value)}
              disabled={carregando}
            >
              <option value="basico">Básico</option>
              <option value="intermediario">Intermediário</option>
              <option value="avancado">Avançado</option>
            </select>
          </div>

          <div>
            <label htmlFor="categoria">Categoria (ID):</label>
            <input
              type="number"
              step="1"
              id="categoria"
              name="categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              disabled={carregando}
              required
            />
          </div>

          <button type="submit" disabled={carregando}>
            {carregando ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>
      </section>
    </main>
  );
}

export default NovoCurso;
