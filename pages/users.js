import Image from "next/image";
import React from "react";
import { Client } from "pg";

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

// async function fetchData() {
//   try {
//     const response = await fetch('https://reqres.in/api/users?page=2');
//     return response.data.data; // Assuming the user data is in the "data" field
//   } catch (error) {
//     console.error('Error fetching data from API:', error);
//     return [];
//   }
// }

// const userData = await fetchData();
// const users = userData;
// const client = new Client({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'postgres',
//   password: '09032000',
//   port: 5432, // PostgreSQL default port
// });
// async function insertData(userData) {
//   try {
//     await client.connect();
    
//     for (const user of userData) {
//       const query = `
//         INSERT INTO users (FirstName, LastName, email)
//         VALUES ($1, $2, $3)
//       `;
//       const values = [user.first_name, user.last_name, user.email];
      
//       await client.query(query, values);
//     }
    
//     console.log('Data inserted successfully.');
//   } catch (error) {
//     console.error('Error inserting data:', error);
//   } finally {
//     await client.end();
//   }
// }

// await insertData(userData);


// export async function getStaticProps() {
//   // Create a PostgreSQL client instance

//   try {
//     await client.connect(); // Connect to the database

//     // Execute a query to get user data
//     const queryResult = await client.query("SELECT * FROM myschema.users");
//     const users = queryResult.rows;

//     return {
//       props: {
//         users,
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching data from PostgreSQL:", error);
//     return {
//       props: {
//         users: [],
//       },
//     };
//   } finally {
//     await client.end(); // Close the database connection
//   }
// };

const Users = () => {
 
  if (!users) {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  }
  return (
    <>{ console.log(users)}
      <h1 style={{ textAlign: "center" }}>User List</h1>
      <ol style={{ display: "flex",flexWrap: 'wrap' }}>
        {users.map(user => (
          <li style={{ width: "20%" }} key={user.id}>
            <p>Name : {user.first_name}</p>
            <p>UserName : {user.last_name}</p>
            <p>Email : {user.email}</p>
            {/* <Image src={user.avatar} width={100} height={100}></Image> */}
          </li>
        ))}
      </ol>
    </>
  );
};

export default Users;
