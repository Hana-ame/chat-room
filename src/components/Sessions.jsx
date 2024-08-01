// Sessions.jsx @ 240731

import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import classNames from 'classnames';
import { apiV1Sessions } from '../functions/api';
import Session from './Session';

const Sessions = () => {
  const [sessions, setSessions] = useState([]); // 存储会话数据
  const [loading, setLoading] = useState(true); // 加载状态
  const [error, setError] = useState(false); // 错误状态

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await apiV1Sessions()
        setSessions(response); // 假设 API 返回的数据是一个数组
      } catch (err) {
        // it seems to be a empty object.
        console.error(err)
        setError(true)
      } finally {
        setLoading(false); // 设置加载完成
      }
    };

    fetchSessions();
  }, []); // 空依赖数组，表示组件挂载时调用

  if (loading) return <div>Loading...</div>; // 加载状态
  if (error) return <Navigate to="/login" />;

  return (
    <div className="bg-gray-800 text-white p-4 m-2 rounded shadow-md overflow-x-auto">
      <table className="table-auto max-w-full">
        <thead>
          <tr>
            {/* <th className="px-4 py-2">SessionID</th> */}
            {/* <th className="px-4 py-2">Username</th> */}
            <th className="px-4 py-2">LoginTime</th>
            <th className="px-4 py-2">Country</th>
            <th className="px-4 py-2">IPAddress</th>
            <th className="px-4 py-2">UserAgent</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => {
            return <Session session={session} />
          })}          
        </tbody>
      </table>

    </div>
  );
};

export default Sessions;