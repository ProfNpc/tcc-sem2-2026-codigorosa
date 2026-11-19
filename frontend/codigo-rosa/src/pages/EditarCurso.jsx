import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { buscarCurso, atualizarCurso } from '../services/cursoService';

export default function EditarCurso() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [dataCriacao, setDataCriacao] = useState('');
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  
  
  
  
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  // No carregamento inicial, busca o curso na API: GET /cursos/{id}
  useEffect(() => {
    async function carregar() {
      setCarregando(true);
      setErro('');
      try {
        const curso = await buscarCurso(id);
        setDataCriacao(curso.dataCriacao ? String(curso.dataCriacao) : '');
        setNome(curso.nome ? curso.nome : '');
        setDescricao(curso.descricao ? curso.descricao : '');
        setPreco(curso.preco === null || curso.preco === undefined ? '' : String(curso.preco));
      } catch (e) {
        setErro('Não foi possível carregar o curso. ' + e.message);
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, [id]);

  async function salvar(evento) {
    evento.preventDefault();
    setSalvando(true);
    setErro('');

    const curso = {
      nome: nome,
      descricao: descricao,
      preco: preco === '' ? null : Number(preco)
    };

    try {
      await atualizarCurso(id, curso);
      navigate('/cursos', { state: { mensagem: 'curso atualizado com sucesso' } });
    } catch (e) {
      setErro('Não foi possível atualizar o curso. ' + e.message);
      setSalvando(false);
    }
  }

  return (
    <div>
      <h1>Editar curso</h1>

      {erro && <div className="erro">{erro}</div>}

      {carregando ? (
        <p>Carregando...</p>
      ) : (
        <form className="formulario" onSubmit={salvar}>
          <label htmlFor="id">id</label>
          <input id="id" type="text" value={id} readOnly />

          <label htmlFor="dataCriacao">dataCriacao</label>
          <input id="dataCriacao" type="text" value={dataCriacao} readOnly />

          <label htmlFor="nome">nome</label>
          <input id="nome" type="text" value={nome} onChange={(e) => setNome(e.target.value)} />

          <label htmlFor="descricao">descrição</label>
          <textarea id="descricao" rows="3" value={descricao} onChange={(e) => setDescricao(e.target.value)} />

          <label htmlFor="preco">preco</label>
          <input id="preco" type="number" step="0.01" value={preco} onChange={(e) => setPreco(e.target.value)} />

          <div className="barra-rodape">
            <button type="button" className="botao botao-secundario" onClick={() => navigate('/cursos')}>
              Cancelar
            </button>
            <button type="submit" className="botao botao-primario" disabled={salvando}>
              {salvando ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
