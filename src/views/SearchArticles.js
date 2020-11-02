import React, { useState, useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import ArticleSegment from '../components/ArticleSegment'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
// Dynamic Component

function SearchArticles() {
    const [articles, setArticles] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [searchInput, setSearchInput] = useState('')
    const [articlesList, setArticlesList] = useState([])
    const history = useHistory()
    // Use push to push a new entry onto the history stack.
    // which explains absolutely nothing without know what is a 'history stack'... Nice one React.
    
    const handleChange = (event) => {
        setSearchInput(event.target.value);
        // Search input is lagging 1 action behind for some reason... No time to fix 
        // implement useHistory.
        if (event.target.value === '') {
            history.push('/search')
        } else history.push(`/search?=${event.target.value}`)
        // idea: continuous submission of input after input change.
        submit(event) // submit should be triggered inside useEffect to get the latest state.
        // (Which is called on change of state)
    }
        
    const submit = (event) => {
        event && event.preventDefault()
        console.log(searchInput)
        const query = event?.target?.value || searchInput; 

        // need to make the query/matching case-agnostic (don't have time!)
        // want to find if the searchterm matches something inside the title, catergoryId or author
        const idMatches = articles.map(article => {
            if(article.title.includes(query)) {// I love native string & array methods!
                return true
            } else if(article.categoryId.includes(query)) {
                return true
            } else if (article.author.includes(query)) {
                return true
            } else {
                return false
            }
        })
        setArticlesList(articles.map( (article, index) => idMatches[index] ? <ArticleSegment key={article.id} article={article}/> : false).filter(Boolean))
    }// useEffect is triggered every time state is updated. all function calls should be made in useEffect
    useEffect(() => {
        console.log(articles)
        if (articles.length === 0) {
        fetch('https://my-json-server.typicode.com/Codaisseur/articles-comments-data/articles')
            .then( res => res.json())
                .then( data => {
                    setArticles(data)
                    console.log(data)
                })
        console.log('this was triggered')
        } else if (!isLoaded && searchInput.length === 0 && history.location.search > 0){
                setSearchInput(history.location.search.slice(2))
        } else if (!isLoaded) {
            console.log('!isLoaded')
            submit()
            setIsLoaded(true)
        }
    })
    // the last parameter of useEffect ensures that 
    // only a change in the variables in brackets trigger useEffect(). will remove it for now.
     
    if (!isLoaded) {
        return <div>Loading...</div>
    } else if (articles.length > 0) {
        return (
            <div className="search">
                <div className='container'>
                    <h3>Search Articles</h3>
                    <form name='search' onSubmit={submit} className='search-form'>
                        <label>
                            <FontAwesomeIcon icon={faSearch} style={{fontSize: 'small'}}/>
                            <input type="text" id='searchInput' placeholder="Search Here..." value={searchInput} name="search" onChange={handleChange}>
                            </input>
                            {`${articlesList.length} articles found`}
                        </label>
                    </form>
                    <div className='articles-list'style={{minheight: '100%'}}>
                        {articlesList}
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchArticles