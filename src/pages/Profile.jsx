// Home.js
import React from 'react';
import classNames from 'classnames';
import { Outlet } from 'react-router-dom';

const Profile = ({ children }) => {
  return (
    <div className={classNames([
      "flex items-center justify-center",
      // "min-h-screen",
      "bg-gray-1000",
    ])}>
      苏打湿答答湿答答洒洒
      苏打湿答答湿答答洒洒
      苏打湿答答湿答答洒洒
      苏打湿答答湿答答洒洒
      苏打湿答答湿答答洒洒
      苏打湿答答湿答答洒洒
      {children}
    </div>
  );
};

export default Profile;