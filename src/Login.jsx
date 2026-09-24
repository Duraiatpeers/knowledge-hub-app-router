import { useState } from 'react'
import axios from 'axios'

const USERS_URL = 'http://localhost:3001/users'

/**
 * Login
 *
 * Day 3 concepts used here
 * -------------------------
 * - Event handling: onChange on each input and onSubmit on the form are
 *   all plain arrow functions.
 * - Props: onLoginSuccess is a callback prop — Login doesn't know or
 *   care what App does with a successful login, it just reports it
 *   upward, the same way ArticleCard reports clicks to ArticleList.
 *
 * Day 4 concepts used here
 * -------------------------
 * - State: username, password, error and submitting are all local state
 *   here, since nothing outside this form needs them.
 * - Conditional rendering: the error message only renders when one
 *   exists, and the button's label/disabled state reflects submitting.
 *
 * Note: this is a training-only mock. Comparing a plaintext password
 * against a json-server file is nowhere close to real authentication —
 * there's no hashing, no server-side session, no token. It exists only
 * to demonstrate state, conditional rendering and an axios GET, wired
 * together through a form.
 */
function Login({ onLoginSuccess }) {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    // A form submits and reloads the page by default — preventDefault()
    // stops that. This is the one piece of form handling borrowed a day
    // early from Day 5, just enough to make this screen work.
    event.preventDefault()

    setSubmitting(true)
    setError(null)

    try {
      // json-server can filter a collection by exact field value, so the
      // username is matched on the server. The password is then checked
      // here, client-side, against the one result that comes back — a
      // real backend would never expose passwords like this, but there
      // is no real backend here, only a JSON file.
      const response = await axios.get(`${USERS_URL}?username=${username}`)
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
          onChange={(event) => setUsername(event.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
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
