import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  startEditing,
  deletePost,
  toggleFavorite,
  toggleComments,
  fetchComments,
} from '../features/posts/postsSlice';
import CommentsList from '../components/CommentsList';
import s from './Post.module.css';

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.posts.comments[post.id]);

  const handleDelete = () => {
    if (window.confirm('Вы уверены, что хотите удалить этот пост?')) {
      dispatch(deletePost(post.id));
    }
  };
  const handleFavorite = () => {
    dispatch(toggleFavorite(post.id));
  };

  const handleComments = () => {
    dispatch(toggleComments(post.id));
    if (!comments) {
      dispatch(fetchComments(post.id));
    }
  };

  return (
    <div className={s.post}>
      <h3 className={s.posttytle}>{post.title}</h3>
      <p className={s.posttext}>{post.body}</p>
      <div>
        <button
          className={s.buttonstyle}
          onClick={() => dispatch(startEditing(post))}>
          Редактировать
        </button>
        <button className={s.buttonstyle} onClick={handleDelete}>
          Удалить
        </button>
        <button className={s.buttonstyle} onClick={handleFavorite}>
          {post.isFavorite ? 'Убрать из избранного' : 'Избранное'}
        </button>
        <button className={s.button_s} onClick={handleComments}>
          {comments ? 'Скрыть комментарии' : 'Комментарии'}
        </button>
        {comments && <CommentsList comments={comments} />}
      </div>
    </div>
  );
};
export default Post;
