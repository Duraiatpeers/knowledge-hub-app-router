import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Header from './Header.tsx'
import Footer from './Footer.tsx'
import Login from './Login.tsx'
import Dashboard from './Dashboard.tsx'
import ArticleList from './ArticleList.tsx'
import type { Article, User, View } from './types.ts'

const ARTICLES_URL = 'http://localhost:3001/articles'

function App() {

  // --- Auth state --------------------------------------------------------
  const [user, setUser] = useState<User | null>(null)

  // --- Which screen to show once logged in --------------------------------
  const [currentView, setCurrentView] = useState<View>('dashboard')

  // --- Articles state (lifted up from ArticleList) ------------------------
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // --- Lifecycle: fetch articles once, right after mounting ---------------
  useEffect(() => {
    let isMounted = true

    async function fetchArticles() {
      try {
        const response = await axios.get<Article[]>(ARTICLES_URL)
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
  }, [])

  // --- Auth handlers -------------------------------------------------------

  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser)
    setCurrentView('dashboard')
  }

  const handleLogout = () => {
    setUser(null)
  }

  // --- Article handlers ------------------------------------------------

  const handleView = (id: number) => {
    console.log('View article with id: ', id)
  }

  const handleLike = (id: number) => {
    setArticles(prev =>
      prev.map(a =>
        a.id === id ? { ...a, likes: a.likes + 1 } : a
      )
    )
  }

  const handleFavourite = (id: number) => {
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