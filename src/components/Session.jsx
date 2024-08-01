// Session.jsx @ 240731
// 横向滚动 @ 240801

import React, { useState } from 'react';
import { apiV1DeleteSession } from '../functions/api';
// import classNames from 'classnames';
import Mtd from './TruncatedTd';

const Session = ({ session }) => {
  const [deleted, setDeleted] = useState(false);

  const handleDelete = async () => {
    const ok = await apiV1DeleteSession(session.session_id); // 替换为你的 API
    if (ok) {
      setDeleted(true);
    }
  };

  if (deleted) return null; // 返回 null 以隐藏组件


  const tdClass = "border px-4 py-2 truncate overflow-x-scroll text-ellipsis"
  return (
    <tr>
      {/* <Mtd className={tdClass} num={15}>
        {session.session_id}
      </Mtd>
      <Mtd className={tdClass} num={15}>
        {session.username}
      </Mtd> */}
      <Mtd className={tdClass} num={30}>
        {new Date(session.login_time).toLocaleString()}
      </Mtd>
      <Mtd className={tdClass} num={10}>
        {session.country.trim() || '未知'}
      </Mtd>
      <Mtd className={tdClass} num={15}>
        {session.ip_address || '未知'}
      </Mtd>
      <Mtd className={tdClass} num={30}>
        {session.user_agent}
      </Mtd>
      <Mtd className={tdClass}>
        <button onClick={handleDelete} className="bg-red-600 text-white p-2 rounded">
          删除会话
        </button>
      </Mtd>
    </tr>
  );
};

export default Session;