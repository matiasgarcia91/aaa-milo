import React, {useState, useEffect } from 'react'
import Comment from '../components/Comment'
import CommentForm from '../components/CommentForm'
// dynamic Component
function ArticleDetails({match}) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [article, setArticle] = useState({})
    const [error, setError] = useState(null)
    const [comments, setComments] = useState([])
    const [commentList, setCommentList] = useState()
    const [updatedComments, setUpdatedComments] = useState(false)
    const [updated, setUpdated] = useState(false)
    // change all the details rendered based on what is the id of the article that was linked.
    // props needed: imgUrl, date, categoryId, id, title, author, content.
    // if it wasn't being retrieved from the API, I would pass down props
    // directly from App as an object like props.article = {title: 'trying Docker' ...}.
    // How does App know which article to fetch from the API
    // How does App change the article it sends?

    // TODO: add a form with name and textArea for posting comments to an article.
    // As API doesn't change state, actual comments won't update on form submission. 
    useEffect( () => {
        if (Object.keys(article).length === 0 && !isLoaded){
            fetch(`https://my-json-server.typicode.com/Codaisseur/articles-comments-data${match.url}`)
                .then(res =>  res.json())
                    .then( data => setArticle(data), error => setError(error) )
        } else if (comments.length === 0){
            fetch(`https://my-json-server.typicode.com/Codaisseur/articles-comments-data/articles/${article.id}/comments`)
                .then(res => res.json())
                    .then(data => setComments(data))
        } else if (comments.length > 0 && !isLoaded) {
            console.log(comments)
            setCommentList(comments.map( comment => <Comment key={comment.id} name={comment.name} message={comment.comment} />))
            setIsLoaded(true)
        } else if (comments.length > 0 && updatedComments && !updated) {
            
            setCommentList(comments.map( comment => <Comment key={comment.id} name={comment.name} message={comment.comment} />))
            setUpdated(true)
        }
    }, [article, isLoaded, match, comments, commentList])

    if (error) {
    <div><h1>DOnT PanIC!! but there was an error</h1><h5>Error: {error}</h5></div>
    } else if (!isLoaded) {
        return <div>Loading...</div>
    }
    return (
        <div className="article">
            <img className='article-img full' src={article.imgUrl} alt={`visualisation of ${article.title}`}/>
            <h2>{article.title}</h2>
            <div className="article-metadata">
                <h5>By: {article.author}</h5>
                <h5>{article.date}</h5>
            </div>
            <div>
                <p>{article.content}</p>
                <div style={{display: 'flex'}}>
                    <CommentForm setComment={setComments} currentComments={comments} setUpdatedComments={setUpdatedComments}/>
                    <div className='comments-section'>
                        {commentList}
                    </div>
                </div>
            </div>
        </div>
        )
}

export default ArticleDetails