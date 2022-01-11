import React from "react";
import { useParams } from "react-router-dom";
import articleContent from './article-content'

const ArticlePage = () => {
  const { name } = useParams()
  const article = articleContent.find(a => a.name === name)
  if(!article) return <h1>Article '{ name }' does not exist..</h1>
  
  return (
    <>
      <h1>{ article.title }</h1>
      { article.content.map((paragraph, key) => {
        return <p key={ key }>{ paragraph }</p>
      })}
      <p>-</p>
      <p>-</p>
    </>
  )
  }

export default ArticlePage;