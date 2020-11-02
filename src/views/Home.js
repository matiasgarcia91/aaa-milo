import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ArticleSegment from '../components/ArticleSegment'
// dynamic Component
function Home(props) {
    //article data is loaded with views. (could potentially be loaded from app then passed down with state, but per view is easier maybe.)
    // No endpoint to retrieve the latest article, and articleIds are not ordered by creation date.
    // In a real world scenario, the database could add a new article at any time, so storing the articleId of the latest article as state in app.js is not a good practice.
    // Best practise in this scenario is to retrieve all articles when latest article is required then search to find latest date.
    console.log(props);
    let [articles, setArticles] = useState([])
    let [latestId, setLatestId] = useState()

    useEffect(() => {
        if (articles.length === 0) {
        fetch('https://my-json-server.typicode.com/Codaisseur/articles-comments-data/articles')
            .then( res => res.json())
                .then( data => setArticles(data), error => console.error(error))

        } else if (!latestId) {
            let timesArr = articles.map( article => article.unixTimeStamp)
            let maxTime = Math.max(...timesArr)
            articles.forEach( article => article.unixTimeStamp === maxTime ? setLatestId(article.id) : null)
        }
    })
    // need  to specify to ArticleSegment what article this veiw wants by finding latest ArticleId and passing down the associated article
    if(!latestId) {
        return <div>loading...</div>
    } else if (articles.length > 0){
        return(
        <div className="home">
            <div className="container">
                <h1>Read the latest article</h1>
                <ArticleSegment article={articles[latestId - 1]}/>
                <Link to="/search" className="button-link">Search Articles</Link>
            </div>
        </div>
    )} else return <div><h1>Page not Found</h1></div>
}
export default Home