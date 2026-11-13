
function NovoCurso() {
  return (
    <main>
      <section>
        <h2>Cursos</h2>

        <p>
          Lista dos cursos cadastrados
        </p>

        <form>
          <label htmlFor="nome">Nome curso:</label>
          <input type="text" id="nome" name="nome" />

          <label htmlFor="descricao">Descrição:</label>
          <input type="text" id="descricao" name="descricao" />

          <select name="categoria">
            <option value="avancado">Avançado</option>
            <option value="intermediario">Intermediário</option>
            <option value="basico">Básico</option>
          </select>


          <label htmlFor="nivel">Categoria:</label>
          <input type="number" step="1" id="nivel" name="nivel" />


          <button type="submit">Cadastrar</button>
        </form>
      </section>
    </main>
  )
}

export default NovoCurso