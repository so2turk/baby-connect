import React from "react";
import articleContent from './article-content'
import { Link } from "react-router-dom";

const ArticleListPage = () => (
  <>
    <h1>Articles</h1>
    { articleContent.map((a, key) => {
      return (
        <Link className='article-list-item' key={ key } to={ `/article/${ a.name }` }>
          <h3>{ a.title }</h3>
          
          <p>{ a.content[0].substring(0,100)}..</p>
        </Link>
    )})}
    
  </>
)

export default ArticleListPage;