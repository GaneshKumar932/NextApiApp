import { useEffect } from "react";
import { insertUsersIntoDatabase } from "./api/insertUsersIntoDatabase";
import { fetchUsersFromAPI } from "./api/fetchUsersFromAPI";

export default function Home() {
  fetchUsersFromAPI();
  insertUsersIntoDatabase();
  return (
    <main>
      <h2>
      Good Morning
      </h2>
    </main>
  )
}
