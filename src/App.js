import React from 'react';
import PostsList from './features/posts/PostsList';
import s from './App.module.css';
function App() {
  return (
    <div className={s.postblock}>
      <h1 className={s.appstyle}>Посты</h1>
      <PostsList />
    </div>
  );
}

export default App;
