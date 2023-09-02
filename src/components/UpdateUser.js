import React, { useState } from 'react'

const UpdateUser = ({user, handleUpdateUser}) => {
  const [newName, setNewName] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newWebsite, setNewWebsite] = useState("");

  const handleSubmit2 = (e) => {
    e.preventDefault();
    handleUpdateUser(user.id,newName, newUserName, newEmail, newPhone, newWebsite);
    setUpdatedUserName('');
    setUpdatedEmail('');
  };

  return (
    <div className='popup'>
      <h2>Update User</h2>
      <form onSubmit={handleSubmit2}>
      <div>
          <label>name:</label>
          <input type="text"  placeholder={user.name} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          <label>Username:</label>
          <input type="text"  placeholder={user.username} onChange={(e) => setNewUserName(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" placeholder={user.email} onChange={(e) => setNewEmail(e.target.value)} />
        </div>
        <div>
          <label>Phone:</label>
          <input type="number"  placeholder={user.phone} onChange={(e) => setNewPhone(e.target.value)} />
        </div>
        <div>
          <label>Website:</label>
          <input type="text"  placeholder={user.website} onChange={(e) => setNewWebsite(e.target.value)} />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  )
}

export default UpdateUser;