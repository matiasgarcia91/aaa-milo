import React, { useState, useEffect } from 'react'
import { ArticleSegment } from '../components';
// Page to list articles from a category
// Dynamic Component
function ListArticles({match}) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [articles, setArticles] = useState([])
    const [error, setError] = useState(null)
    useEffect(() => {
        if (articles.length === 0) {
            console.log(match)
            fetch(`https://my-json-server.typicode.com/Codaisseur/articles-comments-data${match.url}/articles`)
                .then( res => res.json())
                    .then( data => { 
                        setArticles(data)
                    }, (error) => {
                        setIsLoaded(true)
                        setError(error)
                    }
                    )
        } else if(!isLoaded){
            // get the no. of articles and then create a loop to return x number of Article Segments
            setIsLoaded(true)
    }
    }, [articles.length, isLoaded, match])
    if (error) {
        return <div> Error: {error.message} </div>
    }
    else if (!isLoaded) {
        return (
            <div className="container">
                <h1>Loading...</h1>
            </div>
        )
    } else if(articles.length > 0){
        const articlesList = articles.map( article => <ArticleSegment key={article.id} article={article}/>)
        return (
            <div className='articlesList'>
                {articlesList}
            </div>
            )
    } else return <div>404 - Page Not Found!</div>
        
       
}

export default ListArticles