import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom' //
import { Home, ListArticles, SearchArticles, ArticleDetails, NoMatch} from './views/index'
import {Header} from './components/index'

function App() {
    // implement API calls here and pass the data down to the components, (wrong)
    // passing the data component <=> App.
    // Makes app Single Point of Truth.
    // The component/page passes an object to callApi {endpoint: string [, id: number]} with optional id. if id exists, call with id.

  return (
      <div className="app">
        <Router>
          <Header/>
          <Switch>
            <Route exact path='/'  component={ Home } />
            <Route exact path='/categories/:categoryId'  component = { ListArticles } />
            <Route exact path='/search'  component = {SearchArticles} />
            <Route exact path='/articles/:articleId'  component = { ArticleDetails } />
            <Route component={ NoMatch } />
          </Switch>
        </Router>

      </div>
    )

}
  
export default App