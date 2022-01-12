import React from "react";
import { useParams } from "react-router-dom";
import articleContent from './article-content'
import ArticlesList from "../components/articles-list";
import Err404 from "./err404";

const ArticlePage = () => {
  const { name } = useParams()
  const article = articleContent.find(a => a.name === name)
  if(!article) return <Err404 />
  const otherArticles = articleContent.filter(a => a.name !== name)

  if(!article) return <h1>Article '{ name }' does not exist..</h1>
  
  return (
    <>
      <h1>{ article.title }</h1>
      { article.content.map((paragraph, key) => {
        return <p key={ key }>{ paragraph }</p>
      })}
      <h3>Other Articles</h3>
      <ArticlesList articles={ otherArticles } />
    </>
  )
  }

export default ArticlePage;