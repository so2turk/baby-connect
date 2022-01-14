import React from "react";
import { Link } from "react-router-dom";

const ArticlesList = ( { articles }) => (
  <>
    { articles.map((a, key) => (
        <Link className='article-list-item' key={ key } to={ `/article/${ a.name }` }>
          <h3>{ a.title }</h3>
          <p>{ a.content[0].substring(0,150) }..</p>
        </Link>
    ))}
  </>
)


export default ArticlesList