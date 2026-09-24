import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Login from './Login.jsx'
import Dashboard from './Dashboard.jsx'
import ArticleList from './ArticleList.jsx'

// Base URL for the mock REST API served by json-server from db.json.
// Start it in its own terminal with:
//   npx json-server --watch db.json --port 3001
const ARTICLES_URL = 'http://localhost:3001/articles'

/**
 * App
 *
 * App is now the top-level owner of almost everything: who's logged in,
 * which screen is showing, and the articles data itself.
 *
 * Day 3 concepts used here
 * -------------------------
 * - Composition: App assembles Header, Login, Dashboard, ArticleList and
 *   Footer. None of those components know about each other — they only
 *   know what App hands them through props.
 * - Props: user, articles, loading, error and every handler are passed
 *   down as props. Nothing below App reaches out and fetches its own
 *   data or manages its own auth state.
 *
 * Day 4 concepts used here
 * -------------------------
 * - State: user (who's logged in, or null), currentView (which screen
 *   is showing), articles, loading and error all live here, in the one
 *   component that's an ancestor of everyone who needs them.
 * - Lifecycle: the articles fetch happens once, in a useEffect with an
 *   empty dependency array, right after App mounts.
 * - "Where should state live?" — answered for real: articles used to be
 *   fetched inside ArticleList. Once Dashboard also needed it (for the
 *   stats), it was lifted up to the nearest shared parent, App, and
 *   handed down to both. That's exactly the question the Day 4 deck
 *   previews when it says "ask yourself where state should live."
 * - Conditional rendering: which screen renders — Login, Dashboard, or
 *   ArticleList — is decided with plain if/else and &&, no routing
 *   library involved.
 */
function App() {

  // --- Auth state --------------------------------------------------------
  // null while logged out; a user object ({id, username, name}) once
  // Login has confirmed a match. Nothing below App can change this
  // directly — only handleLoginSuccess and handleLogout ever touch it.
  const [user, setUser] = useState(null)

  // Which screen to show once logged in. A plain string is enough for
  // two screens — no routing library needed for this.
  const [currentView, setCurrentView] = useState('dashboard')

  // --- Articles state (lifted up from ArticleList) ------------------------
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // --- Lifecycle: fetch articles once, right after mounting ---------------
  useEffect(() => {
    // Guards against calling setState after App has unmounted.
    let isMounted = true

    async function fetchArticles() {
      try {
        const response = await axios.get(ARTICLES_URL)
        if (isMounted) {
          setArticles(response.data)
          setError(null)
        }
      } catch (err) {
        console.error('Failed to fetch articles:', err)
        if (isMounted) {
          setError('Could not load articles. Is json-server running on port 3001?')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchArticles()

    return () => {
      isMounted = false
    }
  }, []) // run once on mount, regardless of login state

  // --- Auth handlers -------------------------------------------------------
  // Login does the actual checking against db.json; App only receives the
  // result and stores it. This keeps App from knowing anything about how
  // login is implemented — it just reacts to success or logout.

  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser)
    setCurrentView('dashboard')
  }

  const handleLogout = () => {
    setUser(null)
  }

  // --- Article handlers (same Day 4 functional-update pattern as before) --

  const handleView = (id) => {
    console.log('View article with id: ', id)
  }

  const handleLike = (id) => {
    setArticles(prev =>
      prev.map(a =>
        a.id === id ? { ...a, likes: a.likes + 1 } : a
      )
    )
  }

  const handleFavourite = (id) => {
    setArticles(prev =>
      prev.map(a =>
        a.id === id ? { ...a, isFavourite: !a.isFavourite } : a
      )
    )
  }

  // --- Conditional rendering: logged out vs logged in ----------------------

  if (!user) {
    return <Login onLoginSuccess={handleLoginSuccess} />
  }

  return (
    <>
      <Header
        user={user}
        currentView={currentView}
        onNavigate={setCurrentView}
        onLogout={handleLogout}
      />

      {currentView === 'dashboard' && (
        <Dashboard
          user={user}
          articles={articles}
          loading={loading}
          error={error}
        />
      )}

      {currentView === 'articles' && (
        <ArticleList
          articles={articles}
          loading={loading}
          error={error}
          onView={handleView}
          onLike={handleLike}
          onFavourite={handleFavourite}
        />
      )}

      <Footer />
    </>
  )
}

export default App
