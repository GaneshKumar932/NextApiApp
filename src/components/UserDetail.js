import React from 'react';

const UserDetail = ({ user }) => {
  return (
    <div className='popup'>
      <h2>{user.id}</h2>
      <p>Name: {user.username}</p>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Website: {user.website}</p>

    </div>
  );
};

export default UserDetail;
