import React from 'react';
import s from './CommentsList.module.css';

const CommentsList = ({ comments }) => {
  return (
    <div className={s.tytle_comment}>
      <h4>Комментарии</h4>
      {comments.map((comment) => (
        <div key={comment.id} style={{ marginBottom: '10px' }}>
          <strong>
            {comment.name} ({comment.email})
          </strong>
          <p>{comment.body}</p>
        </div>
      ))}
    </div>
  );
};
export default CommentsList;
