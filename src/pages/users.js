import { PrismaClient } from "@prisma/client";
import { useState } from "react";
import UserDetail from "../components/UserDetail";
import UserForm from "../components/CreateUser";
import UpdateUser from "../components/UpdateUser";
import { read, utils} from "xlsx";
import * as ExcelJS from "exceljs";
import ExcelPreview from "../components/ExcelPreview";
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
  const [efile, setEfile] = useState(null);
  const hideview = () => {
    setViewUser(false);
    setOpenForm(false);
    setUpdateUser(false);
  };

  const handleCreateUser = async (name, username, email, phone, website) => {
    try {
      const response = await fetch("/api/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, username, email, phone, website }),
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

  const handleUpdateUser = async (
    userId,
    newName,
    newUserName,
    newEmail,
    newPhone,
    newWebsite
  ) => {
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
          website: newWebsite,
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
  };
  const cancelupload = () => {
    setEfile(null);
  };

  const downloadLastFiveUsers = (users) => {
    const lastFiveUsers = users.slice(-5);
    const selectdReport = "User List Report";
    const workbook = new ExcelJS.Workbook();
    const FileName = selectdReport.replace(" ", "_") + ".xlsx";
    const worksheet = workbook.addWorksheet(selectdReport);
    worksheet.columns = [
      { header: "id", key: "id" },
      { header: "name", key: "name" },
      { header: "username", key: "username" },
      { header: "email", key: "email" },
      { header: "phone", key: "phone" },
      { header: "website", key: "website" },
    ];
    console.log(lastFiveUsers);
    lastFiveUsers.map((user) => {
      worksheet.addRow({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        website: user.website,
      });
    }); // Get the last 5 users
    workbook.xlsx.writeBuffer().then((data) => {
      var blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,",
      });
      var url = window.URL.createObjectURL(blob);
      var a = document.createElement("a");
      document.body.appendChild(a);
      a.href = url;
      a.download = FileName;
      a.click();
    });
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
      <div className="userspage">
        <h1 style={{ textAlign: "center" }}>User List</h1>
        <div className="usersTable">
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th style={{ width: "10%" }}>No</th>
                <th style={{ width: "10%" }}>Id</th>
                <th style={{ width: "25%" }}>Name</th>
                <th style={{ width: "25%" }}>UserName</th>
                <th style={{ width: "10%" }}>View</th>
                <th style={{ width: "10%" }}>Update</th>
                <th style={{ width: "10%" }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <th>{index + 1}</th>
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
        <div>
          <button onClick={() => downloadLastFiveUsers(users)}>
            Download Last 5 Users
          </button>
        </div>
        <button
          className="bg-black text-white"
          onClick={() => setOpenForm(true)}
        >
          Create User
        </button>
        <form>
          <label>Upload Users List : </label>
          <input
            type="file"
            name="upload"
            id="upload"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            onChange={(e) => handleExcelUpload(e)}
          />
        </form>
        {selectedUser && viewUser && (
          <UserDetail user={selectedUser} hideview={hideview} />
        )}
        {updateUser && (
          <UpdateUser
            user={selectedUser}
            handleUpdateUser={handleUpdateUser}
            hideview={hideview}
          />
        )}

        {openForm && (
          <UserForm handleCreateUser={handleCreateUser} hideview={hideview} />
        )}
        {efile && <ExcelPreview efile={efile} uploaddata={uploaddata} cancelupload={cancelupload} />}
      </div>
    </>
  );
};
export default Users;
