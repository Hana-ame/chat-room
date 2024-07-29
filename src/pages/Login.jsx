// Login.jsx

import classNames from 'classnames';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // 这里模拟登录验证，实际情况需要调用 API 进行验证
    if (username === 'admin' && password === 'password') {
      // 登录成功，设置用户身份信息
      localStorage.setItem('isLoggedIn', true);
      navigate('/profile'); // 跳转到主页
    } else {
      // 登录失败，显示错误提示
      alert('用户名或密码错误');
    }
  };

  return (
    <div className={classNames([
      "flex items-center justify-center",
      // "min-h-screen",
      "bg-gray-100",
    ])}>
      <div className="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg rounded-lg lg:w-1/3">
        <div className="font-bold text-xl mb-2">登录</div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              用户名
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="用户名"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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