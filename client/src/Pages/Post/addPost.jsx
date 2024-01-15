import React, { useState } from 'react';
import { addPost } from '../../Services/API/postAPI/postAllAPI';

function AddPost() {
  const [postContent, setPostContent] = useState({
    title: '',
    content: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function readPostValues(e) {
    setPostContent({ ...postContent, [e.target.name]: e.target.value });
  }

  const addPostClick = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!postContent.title || !postContent.content) {
      setErrorMessage('Please fill in both title and content.');
      setSuccessMessage('');
      return;
    }

    try {
      const response = await addPost(postContent);
      setSuccessMessage('Post added successfully');
      setErrorMessage('');
      // Reset form fields
      setPostContent({ title: '', content: '' });
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to add post');
      setSuccessMessage('');
    }
  };

  return (
    <>
      <div>
        <label>Title: </label>
        <input type="text" name="title" value={postContent.title} onChange={readPostValues} />
      </div>
      <div>
        <label>Content: </label>
        <textarea name='content' value={postContent.content} onChange={readPostValues} />
      </div>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <button onClick={addPostClick}>Add Post</button>
    </>
  );
}

export default AddPost;
