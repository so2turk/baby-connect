import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import articleContent from './article-content'
import ArticlesList from "../components/articles-list";
import Err404 from "./err404";

const ArticlePage = () => {
  const { name } = useParams()
  const article = articleContent.find(a => a.name === name)

  const [ articleInfo, setArticleInfo ] = useState({ upvotes: 0, comments: [] })
  useEffect(() => {
    // setArticleInfo({ upvotes: Math.ceil(Math.random() * 10) })
    const fetchData = async () => {
      const result = await fetch(`/api/articles/${name}`)
      const body = await result.json()
      setArticleInfo(body)
    }
    fetchData()
  }, [name])

  if(!article) return <Err404 />
  const otherArticles = articleContent.filter(a => a.name !== name)

  return (
    <>
      <h1>{ article.title }</h1>
      <p>This article has been upvoted {articleInfo.upvotes} times.</p>
      { article.content.map((paragraph, key) => {
        return <p key={ key }>{ paragraph }</p>
      })}
      <h3>Other Articles</h3>
      <ArticlesList articles={ otherArticles } />
    </>
  )
  }

export default ArticlePage;