import { useNavigate } from 'react-router-dom'
import type { Article } from './types'

interface ArticleCardProps {
  article: Article
  onLike: (id: number) => void
  onFavourite: (id: number) => void
}

function ArticleCard({ article, onLike, onFavourite }: ArticleCardProps) {

    const navigate = useNavigate()
    const { id, title, author, description, likes, isFavourite } = article

    return (
    <div className="card">
        <h3>{title}</h3>
        <p>{author}</p>
        <p>{description}</p>
        <p>Likes: {likes}</p>
        {isFavourite && <span className="badge">★ Favourite</span>}

        <div className="btn-row">
        <button onClick={() => navigate(`/articles/${id}`)}>View</button>
        <button onClick={() => onLike(id)}>Like</button>
        <button onClick={() => onFavourite(id)}>
            {isFavourite ? 'Unfavourite' : 'Favourite'}
        </button>
        </div>
    </div>
    )

  
}

export default ArticleCard