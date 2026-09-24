function ArticleCard({article,onView,onLike,onFavourite}){

    const {id,title,author,description,likes} = article;

    return (

        <div className='card'>
            <h3>{title}</h3>
            <p>{author}</p>
            <p>{description}</p>
            <p>Likes: {likes}</p>

            <div className='btn-row'>
                <button onClick={(event) => onView(id)}>View</button>
                <button onClick={(event) => onLike(id)}>Like</button>
                <button onClick={(event) => onFavourite(id)}>Favourite</button>
            </div>

        </div>

    )

}

export default ArticleCard