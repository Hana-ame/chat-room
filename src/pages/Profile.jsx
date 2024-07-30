// Home.js
import React from 'react';
import classNames from 'classnames';
import { useLoaderData } from 'react-router-dom';

const Profile = () => {
  const sessions = useLoaderData()

  return (
    <div className={classNames([
      "flex items-center justify-center",
      // "min-h-screen",
      "bg-gray-1000",
    ])}>
      {sessions}
    </div>
  );
};

export default Profile;