import type { User, View } from './types'

interface HeaderProps {
  user: User
  currentView: View
  onNavigate: (view: View) => void
  onLogout: () => void
}

function Header({ user, currentView, onNavigate, onLogout }: HeaderProps) {
  return (
    <header className="app-header">
      <h1>KnowledgeHub</h1>

      <nav className="app-nav">
        <button
          className={currentView === 'dashboard' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => onNavigate('dashboard')}
        >
          Dashboard
        </button>

        <button
          className={currentView === 'articles' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => onNavigate('articles')}
        >
          Articles
        </button>
      </nav>

      <div className="app-user">
        <span>Hi, {user.name}</span>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </div>
    </header>
  )
}

export default Header