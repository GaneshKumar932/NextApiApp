import React, { useState } from 'react';

const UserForm = ({ handleCreateUser, hideview }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreateUser(name,username, email,phone,website);
    setUsername('');
    setEmail('');
  };

  return (
    
    <div className='black fixed left-0 top-0 w-full h-full flex items-center justify-center'>
    <div className='w-1/5 bg-white p-5 rounded'>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
      <div>
          <label>Name:</label>
          <input type="text" value={name} autoFocus onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Username:</label>
          <input type="text" value={username}  onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Phone:</label>
          <input type="number" value={phone}  onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div>
          <label>Website:</label>
          <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </div>
        <button type="submit">Create</button>
        <button onClick={hideview}>Cancel</button>
      </form>
      </div>
    </div>
  );
};

export default UserForm;
