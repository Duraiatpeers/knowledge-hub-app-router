import ArticleCard from './ArticleCard.jsx'

/**
 * ArticleList
 *
 * Day 3 concepts used here
 * -------------------------
 * - Composition & props: articles, loading, error and every handler now
 *   arrive as props from App — ArticleList is a purely presentational
 *   component, it owns no state of its own.
 *
 * Day 4 concepts used here
 * -------------------------
 * - Conditional rendering: loading / error / empty-list are each an
 *   early return before the "happy path" grid renders.
 * - Lists & keys: articles.map() renders one ArticleCard per article,
 *   keyed by the stable article.id — never the array index.
 *
 * Note: this component used to fetch its own data with useEffect and
 * axios. Once Dashboard also needed the articles (for its stats), the
 * fetch and the state were lifted up to App — the same "where should
 * this state live?" question the Day 4 deck previews, answered for
 * real: in the closest component that's an ancestor of everyone who
 * needs it.
 */
function ArticleList({ articles, loading, error, onView, onLike, onFavourite }) {

  if (loading) {
    return <p className="status-message">Loading articles…</p>
  }

  if (error) {
    return <p className="status-message status-error">{error}</p>
  }

  if (articles.length === 0) {
    return <p className="empty-state">No articles yet. Check back soon.</p>
  }

  return (
    <div className="article-grid">
      {articles.map(article => (
        <ArticleCard
          key={article.id}
          article={article}
          onView={onView}
          onLike={onLike}
          onFavourite={onFavourite}
        />
      ))}
    </div>
  )
}

export default ArticleList
