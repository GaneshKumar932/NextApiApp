import React from 'react';

const UserDetail = ({hideview, user }) => {
  return (
    <div className='popup'>
      <h2>{user.id}</h2>
      <p>Name: {user.name}</p>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Website: {user.website}</p>
      <button onClick={hideview}>close</button>

    </div>
  );
};

export default UserDetail;
