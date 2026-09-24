/**
 * Dashboard
 *
 * Day 3 concepts used here
 * -------------------------
 * - Props: user, articles, loading and error all arrive as props from
 *   App — Dashboard fetches nothing itself and owns no state.
 *
 * Day 4 concepts used here
 * -------------------------
 * - Conditional rendering: loading/error are handled with early returns
 *   before the stats are computed, the same pattern used in ArticleList.
 * - Derived data: the three stats below are never stored in their own
 *   useState — they're recalculated from the articles prop on every
 *   render with reduce()/filter(). Deriving a value instead of
 *   duplicating it in a second piece of state means there's only ever
 *   one source of truth (articles), so it can never drift out of sync.
 */
function Dashboard({ user, articles, loading, error }) {

  if (loading) {
    return <p className="status-message">Loading dashboard…</p>
  }

  if (error) {
    return <p className="status-message status-error">{error}</p>
  }

  const totalArticles = articles.length
  const totalLikes = articles.reduce((sum, article) => sum + article.likes, 0)
  const favouriteCount = articles.filter(article => article.isFavourite).length

  return (
    <div className="dashboard">
      <h2>Welcome back, {user.name}</h2>
      <p className="dashboard-subtitle">Here's how KnowledgeHub is doing today.</p>

      <div className="stat-row">
        <div className="stat-card">
          <span className="stat-value">{totalArticles}</span>
          <span className="stat-label">Articles</span>
        </div>

        <div className="stat-card">
          <span className="stat-value">{totalLikes}</span>
          <span className="stat-label">Total likes</span>
        </div>

        <div className="stat-card">
          <span className="stat-value">{favouriteCount}</span>
          <span className="stat-label">Favourited</span>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
