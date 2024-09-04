import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchPosts,
  setFilter,
  setSort,
  // addPost,
  setUsers,
} from './postsSlice';
import Post from '../../components/Post';
import EditPostForm from '../../components/EditPostForm';
import AddPostForm from './AddPostForm';
import axios from 'axios';
import s from './PostsList.module.css';

const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.items);
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);
  const editingPost = useSelector((state) => state.posts.editingPost);
  const filter = useSelector((state) => state.posts.filter);
  const sort = useSelector((state) => state.posts.sort);
  const users = useSelector((state) => state.posts.users);

  const [showAddPostForm, setShowAddPostForm] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
      axios
        .get('https://jsonplaceholder.typicode.com/users')
        .then((response) => dispatch(setUsers(response.data)));
    }
  }, [status, dispatch]);

  const filteredPosts = posts
    .filter((post) => post.title.includes(filter.title))
    .filter((post) =>
      filter.userId ? post.userId === parseInt(filter.userId) : true
    )
    .filter((post) => (filter.favorite ? post.isFavorite : true))
    .sort((a, b) => {
      if (sort.field === 'id' || sort.field === 'userId') {
        return sort.direction === 'asc'
          ? a[sort.field] - b[sort.field]
          : b[sort.field] - a[sort.field];
      } else if (sort.field === 'title') {
        return sort.direction === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      } else if (sort.field === 'isFavorite') {
        return sort.direction === 'asc'
          ? a.isFavorite - b.isFavorite
          : b.isFavorite - a.isFavorite;
      }
      return 0;
    });

  let content;

  if (status === 'loading') {
    content = <div>Loading...</div>;
  } else if (status === 'succeeded') {
    content = filteredPosts.map((post) => <Post key={post.id} post={post} />);
  } else if (status === 'failed') {
    content = <div>{error}</div>;
  }

  return (
    <div className={s.postlist}>
      {/* <div>
        <button
          onClick={() => dispatch(addPost({ title: '', body: '', userId: 1 }))}>
          Добавить новый пост
        </button>
        <AddPostForm users={users} />
      </div> */}
      <div className={s.postadd}>
        <button
          className={s.button_add}
          onClick={() => setShowAddPostForm(!showAddPostForm)}>
          {showAddPostForm ? 'Отменить' : 'Добавить новый пост'}
        </button>
        {showAddPostForm && (
          <AddPostForm
            users={users}
            onClose={() => setShowAddPostForm(false)}
          />
        )}
      </div>
      <div>
        <input className={s.button_add}
          type="text"
          placeholder="Фильтр по названию"
          value={filter.title}
          onChange={(e) => dispatch(setFilter({ title: e.target.value }))}
        />
        <select className={s.button_add}
          value={filter.userId}
          onChange={(e) => dispatch(setFilter({ userId: e.target.value }))}>
          <option value="">Все пользователи</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <label className={s.button_add}>
          <input 
            type="checkbox"
            checked={filter.favorite}
            onChange={(e) =>
              dispatch(setFilter({ favorite: e.target.checked }))
            }
          />
          Избранное
        </label>
      </div>
      <div>
        <button
          className={s.button_add}
          onClick={() =>
            dispatch(
              setSort({
                field: 'id',
                direction: sort.direction === 'asc' ? 'desc' : 'asc',
              })
            )
          }>
          Сортировать по ID
        </button>
        <button
          className={s.button_add}
          onClick={() =>
            dispatch(
              setSort({
                field: 'title',
                direction: sort.direction === 'asc' ? 'desc' : 'asc',
              })
            )
          }>
          Сортировать по названию
        </button>
        <button
          className={s.button_add}
          onClick={() =>
            dispatch(
              setSort({
                field: 'userId',
                direction: sort.direction === 'asc' ? 'desc' : 'asc',
              })
            )
          }>
          Сортировать по пользователю
        </button>
        <button
          className={s.button_add}
          onClick={() =>
            dispatch(
              setSort({
                field: 'isFavorite',
                direction: sort.direction === 'asc' ? 'desc' : 'asc',
              })
            )
          }>
          Сортировать по избранному
        </button>
      </div>
      {editingPost ? <EditPostForm post={editingPost} /> : content}
    </div>
  );
};

export default PostsList;
