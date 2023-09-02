import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import UserDetail from "../components/UserDetail";
import UserForm from "../components/CreateUser";
import UpdateUser from "../components/UpdateUser";
import { insertUsersIntoDatabase } from "./api/insertUsersIntoDatabase";

const prisma = new PrismaClient();

export async function getStaticProps() {
  try {
    insertUsersIntoDatabase();
    const users = await prisma.User.findMany();
    return {
      props: { users },
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

const Users = ({ users: initialUsers }) => {
  const [users, setUsers] = useState(initialUsers);
  const [updateUser, setUpdateUser] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewUser, setViewUser] = useState(false);

  const handleCreateUser = async (name, username, email, phone, website) => {
    try {
      const response = await fetch("/api/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name, username, email, phone, website}),
      });

      if (response.ok) {
        const newUser = await response.json();
        setUsers([...users, newUser]);
      } else {
        console.error("Error creating user:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleUpdateUser = async (userId,newName, newUserName, newEmail, newPhone, newWebsite) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newName,
          username: newUserName,
          email: newEmail,
          phone: newPhone,
          website: newWebsite
        }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUsers(
          users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
        );
      } else {
        console.error("Error updating user:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await fetch(`/api/users/${userId}`, { method: "DELETE" });
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (!users) {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  }
  return (
    <>
      <h1 style={{ textAlign: "center" }}>User List</h1>
      <div className="usersTable">
      <table style={{ width:"100%" }}>
        <thead>
          <tr>
            <th style={{ width:"10%" }}>Id</th>
            <th style={{ width:"30%" }}>Name</th>
            <th style={{ width:"30%" }}>UserName</th>
            <th style={{ width:"10%" }}>View</th>
            <th style={{ width:"10%" }}>Update</th>
            <th style={{ width:"10%" }}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <th>{user.id}</th>
              <th>{user.name}</th>
              <th>{user.username}</th>
              <th>
                <button
                  onClick={() => {
                    setSelectedUser(user);
                    setViewUser(true);
                  }}
                >
                  View
                </button>
              </th>
              <th>
                <button
                  onClick={() => {
                    setSelectedUser(user);
                    setUpdateUser((prevState) => !prevState);
                  }}
                >
                  Update
                </button>
              </th>
              <th>
                <button onClick={() => handleDeleteUser(user.id)}>
                  Delete
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <button onClick={() => setOpenForm(true)}>Create User</button>
      {selectedUser && viewUser && <UserDetail user={selectedUser} />}
      {updateUser && (
        <UpdateUser user={selectedUser} handleUpdateUser={handleUpdateUser} />
      )}

      {openForm && <UserForm handleCreateUser={handleCreateUser} />}
    </>
  );
};
export default Users;
