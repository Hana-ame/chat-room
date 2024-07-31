// Home.js
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import classNames from 'classnames';
import { profileLoader } from '../functions/api';
import Session from '../components/Session';

const Profile = () => {
  const [sessions, setSessions] = useState([]); // 存储会话数据
  const [loading, setLoading] = useState(true); // 加载状态
  const [error, setError] = useState(false); // 错误状态

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await profileLoader()
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
    <div className={classNames([
      "flex items-center justify-center",
      // "min-h-screen",
      "bg-gray-1000",
    ])}>
      在哪呢
      {sessions.map((session) => {
        return <Session session={session} />
      })}
    </div>
  );
};

export default Profile;