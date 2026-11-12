function Login () {
    return (
        <main>
            <section>
                <h2>Bem-vinda de volta!</h2>

                <p>Acesse sua conta do Código Rosa.</p>

                <form>
                    <label htmlFor="email">E-mail:</label>
                    <input type="email" id="email" name="email"/>

                    <label htmlFor="senha">Senha:</label>
                    <input type="password" id="senha" name="senha"/>

                    <button type="submit">Entrar</button>
                </form>
            </section>
        </main>
    )
}

export default Login 