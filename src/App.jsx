import { useState, useEffect } from 'react'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { auth } from './firebase'

// Traduz erros do Firebase para mensagens em português
function getErrorMessage(code) {
  switch (code) {
    case 'auth/invalid-email':
      return 'E-mail inválido. Verifique e tente novamente.'
    case 'auth/user-not-found':
      return 'Nenhuma conta encontrada com esse e-mail.'
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Senha incorreta. Tente novamente.'
    case 'auth/email-already-in-use':
      return 'Esse e-mail já está cadastrado.'
    case 'auth/weak-password':
      return 'A senha deve ter pelo menos 6 caracteres.'
    case 'auth/too-many-requests':
      return 'Muitas tentativas. Aguarde um momento e tente novamente.'
    case 'auth/network-request-failed':
      return 'Falha de conexão. Verifique sua internet.'
    default:
      return 'Ocorreu um erro. Tente novamente.'
  }
}

export default function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)      // loading inicial (onAuthStateChanged)
  const [submitting, setSubmitting] = useState(false) // loading do login/cadastro
  const [isRegister, setIsRegister] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null) // { text, isError }

  // 4) Detecta estado de autenticação e mantém sessão após reload
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedUser) => {
      setUser(loggedUser)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  // Alterna para tela de cadastro
  function toggleToRegister() {
    setIsRegister(true)
    setMessage(null)
  }

  // Alterna para tela de login
  function toggleToAccess() {
    setIsRegister(false)
    setMessage(null)
  }

  // 2) Cadastro / 3) Login
  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setMessage(null)

    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password)
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
      // onAuthStateChanged cuida do restante
    } catch (error) {
      setMessage({ text: getErrorMessage(error.code), isError: true })
    } finally {
      setSubmitting(false)
    }
  }

  // 7) Logout
  async function handleSignOut() {
    try {
      await signOut(auth)
    } catch (error) {
      setMessage({ text: 'Erro ao sair da conta. Tente novamente.', isError: true })
    }
  }

  // 5) Loading inicial enquanto verifica autenticação
  if (loading) {
    return (
      <div id="loadingOverlay">
        <img src="/img/loading.gif" alt="Carregando..." />
      </div>
    )
  }

  return (
    <div id="app">
      {/* Logotipo */}
      <div className="center">
        <img src="/img/todoList.png" alt="TodoList" />
      </div>

      {/* 5) Loading do submit */}
      {submitting && (
        <div id="loadingOverlay">
          <img src="/img/loading.gif" alt="Carregando..." />
        </div>
      )}

      {/* 6) Interface dinâmica conforme estado do usuário */}

      {/* --- Não autenticado --- */}
      {!user && (
        <div id="auth" className="center">
          <form onSubmit={handleSubmit}>
            <h3>
              {isRegister
                ? 'Insira seus dados para se cadastrar'
                : 'Acesse a sua conta para continuar'}
            </h3>

            <label htmlFor="email">E-mail: </label>
            <input
              type="email"
              id="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password">Senha: </label>
            <input
              type="password"
              id="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* 3) Exibe mensagem de erro */}
            {message && (
              <p className={message.isError ? 'errorMessage' : 'successMessage'}>
                {message.text}
              </p>
            )}

            <button type="submit">
              {isRegister ? 'Cadastrar conta' : 'Acessar'}
            </button>
          </form>

          {!isRegister && (
            <p>
              Não possui uma conta?{' '}
              <button className="alternative" onClick={toggleToRegister}>
                Cadastrar uma nova conta
              </button>
            </p>
          )}

          {isRegister && (
            <p>
              Já possui uma conta?{' '}
              <button className="alternative" onClick={toggleToAccess}>
                Acesse a sua conta
              </button>
            </p>
          )}
        </div>
      )}

      {/* --- Autenticado --- */}
      {user && (
        <div id="userContent">
          <hr />
          <div id="userInfo" className="center">
            <p>Usuário autenticado</p>
            <p id="userEmail">{user.email}</p>
            <button className="alternative" onClick={handleSignOut}>
              Sair
            </button>
          </div>
        </div>
      )}
    </div>
  )
}