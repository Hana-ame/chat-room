// PostStatus.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { Visibility } from '../functions/types';
import { apiV1CreateStatus } from '../functions/api'; // 确保这个函数已经定义并导出
import { isVisibility } from '../functions/utils'; // 确保这个函数已经定义并导出


const PostStatus = () => {
  const [content, setContent] = useState('');
  const [warning, setWarning] = useState('');
  const [visibility, setVisibility] = useState<Visibility>('public'); // 默认设置为公开
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    // 检查内容是否已填写
    if (!content) {
      alert('请填写状态内容');
      return;
    }
  
    try {
      // 调用 API 进行创建状态
      const response = await apiV1CreateStatus({ content, warning, visibility });
  
      if (!response.ok) {
        // 创建状态失败
        const errorData = await response.json();
        alert(errorData.error || '创建状态失败，请稍后重试');
        return;
      }
  
      // 状态创建成功
      console.log('状态创建成功');
      navigate(-1); // 返回上一个页面
    } catch (error) {
      console.error('创建状态过程中发生错误:', error);
      alert('创建状态过程中发生错误，请稍后重试');
    }
  };
  

  return (
    <div className={classNames([
      "flex items-center justify-center",
      "bg-gray-100",
    ])}>
      <div className="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg rounded-lg lg:w-1/2">
        <div className="font-bold text-xl mb-2">发布状态</div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
              状态内容
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="content"
              placeholder="输入你的状态..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="warning">
              警告（可选）
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="warning"
              type="text"
              placeholder="警告信息"
              value={warning}
              onChange={(e) => setWarning(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="visibility">
              可见性
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="visibility"
              value={visibility}
              onChange={(e) => setVisibility(isVisibility(e.target.value)? e.target.value : 'public')}
            >
              <option value="public">公开</option>
              <option value="private">私密</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <button
              className={classNames(["bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",
                'w-full'
              ])}
              type="submit"
            >
              发布状态
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostStatus;
