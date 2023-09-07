import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import XLSX from "xlsx";
import { read, utils, writeFile } from 'xlsx'
import { useEffect, useState } from "react";
import UserDetail from "../components/UserDetail";
import UserForm from "../components/CreateUser";
import UpdateUser from "../components/UpdateUser";
import { insertUsersIntoDatabase } from "./api/insertUsersIntoDatabase";

const prisma = new PrismaClient();

export async function getStaticProps() {
  try {
    // insertUsersIntoDatabase();
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
  const [efile , setEfile] = useState(null);
  const hideview = () => {
    setViewUser(false);
    setOpenForm(false);
    setUpdateUser(false)
  }

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
 
const handleExcelUpload = async (e) => {
  e.preventDefault();
  try {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = e.target.result;
      const workbook = read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = utils.sheet_to_json(worksheet);
      setEfile(jsonData);
      console.log(efile);
      // Assuming jsonData contains an array of objects with user data
      // Loop through the data and insert it into the database
      
    };
    reader.readAsArrayBuffer(e.target.files[0]);
  } catch (error) {
    console.error("Error uploading Excel file:", error);
  }
};
const uploaddata = async (efile) => {
  for (const user of efile) {
    await handleCreateUser(
      user.name,
      user.username,
      user.email,
      user.phone,
      user.website
    );
  }
  setEfile(null);
}

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
            <th style={{ width:"10%" }}>No</th>
            <th style={{ width:"30%" }}>Name</th>
            <th style={{ width:"30%" }}>UserName</th>
            <th style={{ width:"10%" }}>View</th>
            <th style={{ width:"10%" }}>Update</th>
            <th style={{ width:"10%" }}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <th>{index+1}</th>
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
      <button onClick={() => setOpenForm(true)}>Create User</button><br></br><br></br><br></br>
      <form >
      <label>Upload file</label>
      <br></br><br></br>
      <input
                type="file"
                name="upload"
                id="upload"
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                onChange={(e) => handleExcelUpload(e)}
              />
      </form>
      {selectedUser && viewUser && <UserDetail user={selectedUser} hideview={hideview} />}
      {updateUser && (
        <UpdateUser user={selectedUser} handleUpdateUser={handleUpdateUser} hideview={hideview} />
      )}

      {openForm && <UserForm handleCreateUser={handleCreateUser} hideview={hideview} />}
      {efile && (
        <>
        <h1 style={{ textAlign: "center" }}>Excel File Data</h1>
        <div className="usersTable">
        <table style={{ width:"100%" }}>
          <thead>
            <tr>
              <th style={{ width:"10%" }}>No</th>
              <th style={{ width:"20%" }}>Name</th>
              <th style={{ width:"30%" }}>UserName</th>
              <th style={{ width:"10%" }}>Email</th>
              <th style={{ width:"20%" }}>Mobile</th>
              <th style={{ width:"10%" }}>Website</th>
            </tr>
          </thead>
          <tbody>
            {efile.map((user) => (
              <tr key={user.no}>
                <th>{user.no}</th>
                <th>{user.name}</th>
                <th>{user.username}</th>
                <th>{user.email}</th>
                <th>{user.phone}</th>
                <th>{user.website}</th>
               
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={(e)=>{e.preventDefault();uploaddata(efile)}}>Upload</button>
        </div>
        </>
      )
      }
    </>
  );
};
export default Users;
