import React, { useState } from "react";

const AddCommentForm = ({ articleName, setArticleInfo }) => {
  const [ name, setUserName ] = useState('')
  const [ commentText, setCommentText ] = useState('')

  const addComment = async () => {
    const result = await fetch(`/api/articles/${articleName}/add-comment`, {
      method: 'post',
      body: JSON.stringify({ name, text: commentText}),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    const body = result.json()
    setArticleInfo(body)
    setUserName('')
    setCommentText('')
  }
  return (
  <>
    <div id="add-comment-form">
      <h3>Add a Comment</h3>
      <label>
        Name:
        <input type="text" value={name} onChange={(event) => setUserName(event.target.value)}/>
      </label>
      <label>
        Comment:
        <textarea rows="4" cols="50" value={commentText} onChange={(event) => setCommentText(event.target.value)} />
      </label>
      <button onClick={() => addComment()}>Add Comment</button>
    </div>
  </>
  )
}

export default AddCommentForm
