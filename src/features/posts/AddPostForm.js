import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from './postsSlice';
import s from './AddPostForm.module.css';

const AddPostForm = ({ users, onClose }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [userId, setUserId] = useState(users.length > 0 ? users[0].id : '');
  const dispatch = useDispatch();

  const onAddPost = () => {
    if (title && body && userId) {
      dispatch(addPost({ title, body, userId: parseInt(userId) }));
      setTitle('');
      setBody('');
      onClose();
    }
  };

  return (
    <div>
      <h3 className={s.postadd}>Добавить новый пост</h3>
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
          <select value={userId} onChange={(e) => setUserId(e.target.value)}>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <button className={s.button_add} type="button" onClick={onAddPost}>
          Добавить
        </button>
      </form>
    </div>
  );
};

export default AddPostForm;
