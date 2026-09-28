import { useState, useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './App.css'
import Header from './Header.tsx'
import Footer from './Footer.tsx'
import Login from './Login.tsx'
import Dashboard from './Dashboard.tsx'
import ArticleList from './ArticleList.tsx'
import ArticleDetail from './ArticleDetail.tsx'
import NotFound from './NotFound.tsx'
import type { Article, User } from './types'

const ARTICLES_URL = 'http://localhost:3001/articles'

function App() {

  const [user, setUser] = useState<User | null>(null)

  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()

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

  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser)
    navigate('/dashboard')
  }

  const handleLogout = () => {
    setUser(null)
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



    return (
    <>
      {user && <Header user={user} onLogout={handleLogout} />}

      <Routes>
        <Route
          path="/"
          element={<Navigate to={user ? '/dashboard' : '/login'} replace />}
        />

        <Route
          path="/login"
          element={
            user
              ? <Navigate to="/dashboard" replace />
              : <Login onLoginSuccess={handleLoginSuccess} />
          }
        />

        <Route
          path="/dashboard"
          element={
            user
              ? <Dashboard user={user} articles={articles} loading={loading} error={error} />
              : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/articles"
          element={
            user
              ? (
                <ArticleList
                  articles={articles}
                  loading={loading}
                  error={error}
                  onLike={handleLike}
                  onFavourite={handleFavourite}
                />
              )
              : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/articles/:id"
          element={
            user
              ? (
                <ArticleDetail
                  articles={articles}
                  loading={loading}
                  error={error}
                  onLike={handleLike}
                  onFavourite={handleFavourite}
                />
              )
              : <Navigate to="/login" replace />
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>

      {user && <Footer />}
    </>
  )
}


export default App