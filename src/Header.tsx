import { NavLink } from 'react-router-dom'
import type { User } from './types'

interface HeaderProps {
  user: User
  onLogout: () => void
}

function Header({ user, onLogout }: HeaderProps) {
  return (
    <header className="app-header">
      <h1>KnowledgeHub</h1>

      <nav className="app-nav">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => (isActive ? 'nav-btn active' : 'nav-btn')}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/articles"
          className={({ isActive }) => (isActive ? 'nav-btn active' : 'nav-btn')}
        >
          Articles
        </NavLink>
      </nav>

      <div className="app-user">
        <span>Hi, {user.name}</span>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </div>
    </header>
  )
}

export default Header