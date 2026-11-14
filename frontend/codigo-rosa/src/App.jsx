import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './components/header'
import Footer from './components/footer'

import Home from './pages/home'
import Sobre from './pages/sobre'
import Conteudos from './pages/conteudos'
import Comunidade from './pages/comunidade'
import Cadastro from './pages/cadastro'
import ListaCursos from './pages/ListaCursos'
import EditarCurso from './pages/EditarCurso'
import Login from './pages/login'

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/conteudos" element={<Conteudos />} />
        <Route path="/comunidade" element={<Comunidade />} />
        {/* <Route path="/cadastro" element={<Cadastro />} /> */}
        <Route path="/cursos" element={<ListaCursos />} />
        <Route path="/cursos/editar/:id" element={<EditarCurso />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App