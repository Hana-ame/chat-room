// StatusList.tsx by gpt4o mini @ 240803

import React, { useState, useEffect } from 'react';

import classNames from 'classnames';

import { apiV1GetStatuses } from '../functions/api'; // 导入你的 API 函数
import { Status } from '../functions/types';

const StatusList = () => {
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const data = await apiV1GetStatuses(10); // 获取最多10条状态
        setStatuses(data);
      } catch (error) {
        // 将错误断言为 Error 类型
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('发生了未知错误');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStatuses();
  }, []);

  if (loading) {
    return <div>加载中...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
<div className={classNames([
      "flex items-center justify-center",
      "bg-gray-100 min-h-screen p-4"
    ])}>
      {statuses.length > 0 ? (
        <ul className="w-full max-w-xl">
          {statuses.map(status => (
            <li key={status.id} className="bg-white p-4 border-b border-gray-200">
              <div className="flex items-start">
                <img src={"/favicon.ico"} alt="avatar" className="w-12 h-12 rounded-full mr-4" />
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold">{status.username}</div>
                      <div className="text-gray-500">@{status.username}</div>
                    </div>
                    <div className="text-gray-500">{status.createdAt}</div>
                  </div>
                  <div className="mt-2">{status.content}</div>
                  <div className="mt-2 flex items-center text-gray-500">
                    <button className="mr-4 flex items-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2v-8a2 2 0 012-2h2m4-4v12m0-12l-4 4m4-4l4 4" />
                      </svg>
                      <span className="ml-1">0</span>
                    </button>
                    <button className="mr-4">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12h16M4 6h16M4 18h16" />
                      </svg>
                    </button>
                    <button>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>没有状态</div>
      )}
    </div>
  );
};

export default StatusList;
