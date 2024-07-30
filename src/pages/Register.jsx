// Register.jsx

import classNames from 'classnames';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // 模拟注册验证，实际情况需要调用 API 进行注册
    if (!(email && username && password)) {      
      // 注册失败，显示错误提示
      alert('请填写邮箱、用户名和密码');
      return;
    }
    // 检查用户名是否只包含字母和数字
    const usernamePattern = /^[a-zA-Z0-9]+$/;
    if (!usernamePattern.test(username)) {
      alert('用户名只能包含字母和数字');
      return;
    } 
    
    try {
      // 调用API进行注册
      const response = await fetch('/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password }),
      });
  
      if (response.ok) {
        // 注册成功
        navigate('/profile');
      } else {
        // 注册失败
        const errorData = await response.json();
        alert(errorData.error || '注册失败,请稍后重试');
      }
    } catch (error) {
      console.error('注册过程中发生错误:', error);
      alert('注册过程中发生错误,请稍后重试');
    }
  };

  return (
    <div className={classNames([
      "flex items-center justify-center",
      "bg-gray-100",
    ])}>
      <div className="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg rounded-lg lg:w-1/3">
        <div className="font-bold text-xl mb-2">注册</div>
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
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className={classNames(["bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",
                'w-full'
              ])}
              type="submit"
            >
              注册
            </button>
          </div>
        </form>
        <div className="mt-4">
          <Link to="/login" className="text-blue-500 hover:underline">已有账户？登录</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;