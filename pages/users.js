import Image from "next/image";
import React from "react";
import pool from "../components/db";// Import the database connection from db.js

async function fetchData() {
  onsole.log("1");
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    return response.data.data; // Assuming the user data is in the "data" field
    
  } catch (error) {
    console.error('Error fetching data from API:', error);
    return [];
  }
}
const userData = await fetchData();

async function insertData(userData) {
    try {
      await pool.connect();
      
      for (const user of userData) {
        const query = `
          INSERT INTO Users (Id, Name, UserName, Email)
          VALUES ($1, $2, $3, $4)
        `;
        const values = [user.id, user.name,user.username, user.email];
        
        await pool.query(query, values);
      }
      
      console.log('Data inserted successfully.');
    } catch (error) {
      console.error('Error inserting data:', error);
    } finally {
      await pool.end();
    }
  }
  
  await insertData(userData)

export async function getStaticProps() {
  try {
    const result = await pool.query('SELECT * FROM mySchema.Users'); // Modify the query according to your database schema
    const users = result.rows;

    return {
      props: {
        users,
      },
    };
  } catch (error) {
    console.error('Error fetching data from database:', error);
    return {
      props: {
        users: [],
      },
    };
  }
}


const Users = ( {users} ) => {
   
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
      <ol style={{ display: "flex",flexWrap: 'wrap' }}>
        {users.map(user => (
          <li style={{ width: "20%" }} key={user.id}>
            <p>Name : {user.name}</p>
            <p>UserName : {user.username}</p>
            <p>Email : {user.email}</p>
            {/* <Image src={user.avatar} width={100} height={100}></Image> */}
          </li>
        ))}
      </ol>
    </>
  );
};
export default Users;
// export async function getStaticProps() {
//     // Fetch data on the server side
//     const res = await fetch("https://jsonplaceholder.typicode.com/users");
//     const users = await res.json();
//     // console.log(users);
//     return {
//       props: {
//         users: { users },
//       },
//   }
//  }