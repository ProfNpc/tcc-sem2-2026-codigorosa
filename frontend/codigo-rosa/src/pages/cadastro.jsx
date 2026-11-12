
function Cadastro() {
  return (
    <main>
      <section>
        <h2>Crie sua conta</h2>

        <p>
          Faça parte do Código Rosa e acompanhe
          nossos conteúdos.
        </p>

        <form>
          <label htmlFor="nome">Nome completo:</label>
          <input type="text" id="nome" name="nome" />

          <label htmlFor="email">E-mail:</label>
          <input type="email" id="email" name="email" />

          <label htmlFor="senha">Senha:</label>
          <input type="password" id="senha" name="senha" />

          <button type="submit">Cadastrar</button>
        </form>
      </section>
    </main>
  )
}

export default Cadastro
