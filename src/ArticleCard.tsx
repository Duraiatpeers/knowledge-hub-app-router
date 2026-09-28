import type { Article } from './types'

interface ArticleCardProps {
  article: Article
  onView: (id: number) => void
  onLike: (id: number) => void
  onFavourite: (id: number) => void
}

function ArticleCard({ article, onView, onLike, onFavourite }: ArticleCardProps) {

  const { id, title, author, description, likes } = article

  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{author}</p>
      <p>{description}</p>
      <p>Likes: {likes}</p>

      <div className="btn-row">
        <button onClick={() => onView(id)}>View</button>
        <button onClick={() => onLike(id)}>Like</button>
        <button onClick={() => onFavourite(id)}>Favourite</button>
      </div>
    </div>
  )
}

export default ArticleCard