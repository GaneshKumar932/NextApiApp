import React from 'react'

const ExcelPreview = ({efile, uploaddata}) => {
    const upload = ()=>{
        uploaddata(efile);
    }
  return (
    <>
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
              onClick={(e) =>{e.preventDefault(); upload()}}
            >
              Upload
            </button>
          </div>
        </>
  )
}

export default ExcelPreview