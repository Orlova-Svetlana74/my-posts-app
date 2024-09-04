import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { savePost, cancelEditing } from '../features/posts/postsSlice';
import s from './EditPostForm.module.css';

const EditPostForm = ({ post }) => {
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const [userId, setUserId] = useState(post.userId);
  const dispatch = useDispatch();

  const onSave = () => {
    dispatch(savePost({ id: post.id, title, body, userId }));
  };

  return (
    <div>
      <h3 className={s.edittytle}>Редактировать пост</h3>
      <form>
        <div className={s.postaddlabel}>
          <label>Заголовок:</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className={s.postaddlabel}>
          <label>Текст:</label>
          <textarea value={body} onChange={(e) => setBody(e.target.value)} />
        </div>
        <div className={s.postaddlabel}>
          <label>Пользователь:</label>
          <input value={userId} onChange={(e) => setUserId(e.target.value)} />
        </div>
        <button className={s.button_add} type="button" onClick={onSave}>
          Сохранить
        </button>
        <button className={s.button_add} type="button" onClick={() => dispatch(cancelEditing())}>
          Отмена
        </button>
      </form>
    </div>
  );
};
export default EditPostForm;