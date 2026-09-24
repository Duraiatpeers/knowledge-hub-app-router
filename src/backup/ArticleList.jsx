import {articles} from '../data/articles'
import ArticleCard from './ArticleCard.jsx'


/* ArticleList component 
Data can be passed through props, destructuring props, object */

function ArticleList(){

    const handleView = (id,event)  => {
        console.log("View article with id: ", id, ' event: ', event)
    }

    const handleLike = (id,event)  => {
        console.log("Like article with id: ", id,' event: ', event)
    }

    const handleFavourite = (id,event)  => {
        console.log("Favourite article with id: ", id,' event: ', event)
    }

    return (

        <div className="article-grid" >
                {articles.map ( 
                    article =>
                        <ArticleCard 
                            key={article.id} 
                            article={article} 
                            onView={handleView}
                            onLike={handleLike}
                            onFavourite={handleFavourite}
                        /> 
                )
                }
            
        </div>

    )

}

export default ArticleList