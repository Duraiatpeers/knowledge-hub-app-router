import type { Article } from './types.ts'
import ArticleCard from './ArticleCard.tsx'

interface ArticleListProps {
  articles: Article[]
  loading: boolean
  error: string | null
  onView: (id: number) => void
  onLike: (id: number) => void
  onFavourite: (id: number) => void
}

function ArticleList({ articles, loading, error, onView, onLike, onFavourite }: ArticleListProps) {

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