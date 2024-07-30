import React, { useEffect, useState } from 'react';
import { deleteSessionById } from '../functions/profile_loader';
// import classNames from 'classnames';

const Session = ({ session }) => {
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    const deleteSession = async () => {
      const ok = await deleteSessionById(session.session_id); // 替换为你的 API
      if (ok)
        setDeleted(true);
    }

    deleteSession();
  }, [session]);

  if (deleted) return;

  return (
    <div key={session.session_id} className="bg-gray-800 text-white p-4 m-2 rounded shadow-md w-full max-w-md">
      <p><strong>SessionID:</strong> {session.session_id}</p>
      <p><strong>Username:</strong> {session.username}</p>
      <p><strong>LoginTime:</strong> {new Date(session.login_time).toLocaleString()}</p>
      <p><strong>Country:</strong> {session.country.trim() || '未知'}</p>
      <p><strong>IPAddress:</strong> {session.ip_address || '未知'}</p>
      <p><strong>UserAgent:</strong> {session.user_agent}</p>
    </div>
  );
};

export default Session;