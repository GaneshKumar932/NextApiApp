import React from 'react';

const UserDetail = ({hideview, user }) => {
  return (
    <div className='black fixed left-0 top-0 w-full h-full flex items-center justify-center'>
    <div className='w-1/5 bg-white p-5 rounded'>
      <h2>{user.id}</h2>
      <p>Name: {user.name}</p>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Website: {user.website}</p>
      <button onClick={hideview}>close</button>
    </div>
    </div>
  );
};

export default UserDetail;
