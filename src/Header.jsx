/**
 * Header
 *
 * Day 3 concepts used here
 * -------------------------
 * - Props: user, currentView, onNavigate and onLogout all arrive from
 *   App. Header doesn't track navigation state itself — every click
 *   just calls a callback prop and lets App decide what happens next.
 *
 * Day 4 concepts used here
 * -------------------------
 * - Conditional rendering: the "active" class on each nav button is
 *   picked with a ternary based on currentView, so the current screen
 *   is always visually obvious.
 */
function Header({ user, currentView, onNavigate, onLogout }) {
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
