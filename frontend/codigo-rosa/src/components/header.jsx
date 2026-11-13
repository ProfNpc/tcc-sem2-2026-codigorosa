
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header>
      <h1>Código Rosa</h1>

      <nav className="menu">
        <Link to="/">Início</Link>
        <Link to="/sobre">Sobre</Link>
        <Link to="/conteudos">Conteúdos</Link>
        <Link to="/comunidade">Comunidade</Link>
        {/* <Link to="/cadastro">Cadastro</Link> */}
        <Link to="/cursos">Cursos</Link>

        <Link to="/login">Entrar</Link>
      </nav>
    </header>
  )
}

export default Header
