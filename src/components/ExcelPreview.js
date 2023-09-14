import React from "react";

const ExcelPreview = ({ efile, uploaddata , cancelupload }) => {
  const upload = () => {
    uploaddata(efile);
  };
  return (
    <div className="black fixed left-0 top-0 w-full h-full flex items-center justify-center">
      <div className="w-4/5 bg-white p-5 rounded">
        <h1 style={{ textAlign: "center" }}>Excel File Data</h1>
        <div className="usersTable">
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th style={{ width: "10%" }}>No</th>
                <th style={{ width: "20%" }}>Name</th>
                <th style={{ width: "30%" }}>UserName</th>
                <th style={{ width: "10%" }}>Email</th>
                <th style={{ width: "20%" }}>Mobile</th>
                <th style={{ width: "10%" }}>Website</th>
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
          <button
            onClick={(e) => {
              e.preventDefault();
              upload();
            }}
          >
            Upload
          </button>
          <button onClick={(e)=>{
            e.preventDefault();
            cancelupload();
          }}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ExcelPreview;
