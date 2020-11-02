import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// Dynamic Component

function ArticleSegment(props) {
    const [isLoaded, setIsLoaded] = useState(false)
    
    useEffect( () => { // loads on mount & on update.
        if ( props?.article && !isLoaded) {
            setIsLoaded(true)
        }
    }, [props.article, isLoaded])
    
    if (!isLoaded) {
        return <div>Loading...</div>
    } else {
        return (
            <div className='article-section'>
                <div className="article-segment">
                    <img className='article-img inline' src={props.article.imgUrl} alt="visualisation of article topic"/>
                    <div>
                        <h3>{props.article.title}</h3>
                        <h5>By: {props.article.author}</h5>
                        <h5>Category: <Link to={`/categories/${props.article.categoryId}`}>{props.article.categoryId}</Link></h5>
                    </div>
                </div>
                <Link to={`/articles/${props.article.id}`} className="button-link" >Read The Article</Link>
            </div>
        )
    }
}

export default ArticleSegment