import { useState, type FormEvent, type ChangeEvent } from 'react'
import axios from 'axios'
import type { User } from './types'

const USERS_URL = 'http://localhost:3001/users'

interface LoginProps {
  onLoginSuccess: (user: User) => void
}

function Login({ onLoginSuccess }: LoginProps) {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setSubmitting(true)
    setError(null)

    try {
      const response = await axios.get<User[]>(`${USERS_URL}?username=${username}`)
      const matchedUser = response.data[0]

      if (matchedUser && matchedUser.password === password) {
        onLoginSuccess(matchedUser)
      } else {
        setError('Incorrect username or password.')
      }
    } catch (err) {
      console.error('Login request failed:', err)
      setError('Could not reach the server. Is json-server running?')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>KnowledgeHub</h1>
        <p className="login-subtitle">Sign in to continue</p>

        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
          required
        />

        {error && <p className="status-message status-error">{error}</p>}

        <button type="submit" disabled={submitting}>
          {submitting ? 'Signing in…' : 'Sign in'}
        </button>

        <p className="login-hint">Try: anita / anita123 or rahul / rahul123</p>
      </form>
    </div>
  )
}

export default Login