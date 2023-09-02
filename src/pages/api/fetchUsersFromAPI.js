import axios from 'axios';


export async function fetchUsersFromAPI() {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      const users = response.data.map(user => ({
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        website: user.website,
      }));
      return users;
    } catch (error) {
      console.error('Error fetching data from API:', error);
      throw error;
    }
  }