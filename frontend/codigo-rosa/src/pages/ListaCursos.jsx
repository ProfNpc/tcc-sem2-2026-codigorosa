import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { listarCursos, apagarCurso } from '../services/cursoService';
import Modal from '../components/Modal';




function IconeLapis() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
    </svg>
  );
}


function ListaCursos() {
  const navigate = useNavigate();
  const location = useLocation();

  const [cursos, setCursos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  // Curso selecionado para exclusão (abre o modal de confirmação)
  const [cursoParaApagar, setCursoParaApagar] = useState(null);
  // Mensagem de sucesso exibida em modal
  const [mensagemSucesso, setMensagemSucesso] = useState('');

  async function carregarCursos() {
    
    setCarregando(true);
    setErro('');
    try {
      const lista = await listarCursos();
      setCursos(lista);
    } catch (e) {
      setErro('Não foi possível carregar os cursos. ' + e.message);
    } finally {
      setCarregando(false);
    }
    
    
  }

  // Sempre que a página é carregada, busca a lista na API.
  // Se viemos de "Novo" ou "Editar" com uma mensagem, exibe o modal de sucesso.
  useEffect(() => {
    console.log('useEffect');
    carregarCursos();
    if (location.state && location.state.mensagem) {
      setMensagemSucesso(location.state.mensagem);
      // Limpa o state para o modal não reaparecer ao atualizar a página (F5)
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.key]);

  function abrirConfirmacaoApagar(curso) {
    setCursoParaApagar(curso);
  }

  function cancelarApagar() {
    setCursoParaApagar(null);
    carregarCursos();
  }

  async function confirmarApagar() {
    const curso = cursoParaApagar;
    setCursoParaApagar(null);
    try {
      await apagarCurso(curso.id);
      await carregarCursos();
      setMensagemSucesso('Curso apagado com sucesso');
    } catch (e) {
      setErro('Não foi possível apagar o curso. ' + e.message);
    }
  }

  function formatarPreco(preco) {
    if (preco === null || preco === undefined) {
      return '';
    }
    return Number(preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  function formatarData(data) {
    if (!data) {
      return '';
    }
    const d = new Date(data);
    if (isNaN(d.getTime())) {
      return data;
    }
    return d.toLocaleString('pt-BR');
  }

  return (
    <main>
        <section id="inicio">
            <div>
            <h1>Lista Cursos</h1>

            <div className="barra-topo">
                <button className="botao botao-primario" onClick={() => navigate('/cursos/novo')}>
                + Novo
                </button>
            </div>

            {erro && <div className="erro">{erro}</div>}

            {carregando ? (
                <p>Carregando...</p>
            ) : (
                <table className="tabela-zebrada">
                <thead>
                    <tr>
                    <th>id</th>
                    <th>nome</th>
                    <th>descrição</th>
                    <th>preco</th>
                    <th>dataCriacao</th>
                    <th></th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    {cursos.length === 0 ? (
                    <tr>
                        <td colSpan="7" className="vazio">Nenhum curso cadastrado.</td>
                    </tr>
                    ) : (
                    cursos.map((curso) => (
                        <tr key={curso.id}>
                        <td>{curso.id}</td>
                        <td>{curso.nome}</td>
                        <td>{curso.descricao}</td>
                        <td className="numero">{formatarPreco(curso.preco)}</td>
                        <td>{formatarData(curso.dataCriacao)}</td>
                        <td className="celula-acao">
                            <button
                            className="botao-icone botao-apagar"
                            data-tooltip="Apagar curso"
                            aria-label="Apagar curso"
                            onClick={() => abrirConfirmacaoApagar(curso)}
                            >
                            X
                            </button>
                        </td>
                        <td className="celula-acao">
                            <button
                            className="botao-icone botao-editar"
                            data-tooltip="Editar curso"
                            aria-label="Editar curso"
                            onClick={() => navigate('/cursos/editar/' + curso.id)}
                            >
                            <IconeLapis />
                            </button>
                        </td>
                        </tr>
                    ))
                    )}
                </tbody>
                </table>
            )}

            {cursoParaApagar && (
                <Modal mensagem={'Deseja realmente apagar o curso ' + cursoParaApagar.id + ' - ' + cursoParaApagar.nome + '?'}>
                <button className="botao botao-secundario" onClick={cancelarApagar}>Cancelar</button>
                <button className="botao botao-perigo" onClick={confirmarApagar}>Apagar</button>
                </Modal>
            )}

            {mensagemSucesso && (
                <Modal mensagem={mensagemSucesso}>
                <button className="botao botao-primario" onClick={() => setMensagemSucesso('')}>OK</button>
                </Modal>
            )}
            </div>
        </section>
    </main>
  );
}

export default ListaCursos