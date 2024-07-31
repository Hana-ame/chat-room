// Login.jsx

import classNames from 'classnames';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getCookiesAsMap } from '../Tools/WebappUtils';
import { apiV1Login } from '../functions/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // 检查用户名和密码是否已填写
    if (!(email && password)) {
      alert('请填写邮箱和密码');
      return;
    }

    try {
      // 调用API进行登录
      const response = await apiV1Login({email, password})

      if (!response.ok) {
        // 登录失败
        const errorData = await response.json();
        alert(errorData.error || '登录失败，请检查用户名和密码');
        return
      }
      
      // 登录成功
      // 检查cookie是否已设置
      const cookies = getCookiesAsMap(document)
      console.log(cookies)
      if (cookies.has("session_id")) {
        console.log('登录成功，session_id cookie已设置');
        navigate('/profile');
      } else {
        console.log('登录可能成功，但未找到sessionId cookie');
        alert('登录状态异常，请重试');
        return
      }
    } catch (error) {
      console.error('登录过程中发生错误:', error);
      alert('登录过程中发生错误，请稍后重试');
    }
  };

  return (
    <div className={classNames([
      "flex items-center justify-center",
      // "min-h-screen",
      "bg-gray-100",
    ])}>
      <div className="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg rounded-lg lg:w-1/2">
        <div className="font-bold text-xl mb-2">登录</div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                邮箱
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="邮箱"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              密码
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className='w-2/5'>
            <button
              className={classNames(["bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",
                'w-full'
              ])}
              type="submit"
            >
              登录
            </button>
            </div>
            <div className='w-2/5'>
            <Link to="/register">
              <button
                className={classNames(["bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",
                  'w-full'
                ])}
                // type="submit"
              >
                注册
              </button>
            </Link>
            </div>
            </div>
        </form>
      </div>
    </div>
  );
};

export default Login;