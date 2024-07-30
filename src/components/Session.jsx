import React, { useState } from 'react';
import { apiV1DeleteSession } from '../functions/api';
// import classNames from 'classnames';

const Session = ({ session }) => {
  const [deleted, setDeleted] = useState(false);

  const handleDelete = async () => {
    const ok = await apiV1DeleteSession(session.session_id); // 替换为你的 API
    if (ok) {
      setDeleted(true);
    }
  };

  if (deleted) return null; // 返回 null 以隐藏组件

  return (
    <div key={session.session_id} className="bg-gray-800 text-white p-4 m-2 rounded shadow-md w-full max-w-md">
      <p><strong>SessionID:</strong> {session.session_id}</p>
      <p><strong>Username:</strong> {session.username}</p>
      <p><strong>LoginTime:</strong> {new Date(session.login_time).toLocaleString()}</p>
      <p><strong>Country:</strong> {session.country.trim() || '未知'}</p>
      <p><strong>IPAddress:</strong> {session.ip_address || '未知'}</p>
      <p><strong>UserAgent:</strong> {session.user_agent}</p>
      <button onClick={handleDelete} className="mt-2 bg-red-600 text-white p-2 rounded">
        删除会话
      </button>
    </div>
  );
};

export default Session;