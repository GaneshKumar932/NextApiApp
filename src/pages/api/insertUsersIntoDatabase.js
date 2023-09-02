import { PrismaClient } from '@prisma/client';
import { fetchUsersFromAPI } from './fetchUsersFromAPI.js';

const prisma = new PrismaClient();

export async function insertUsersIntoDatabase() {  
  
  try {
    const usersToInsert = await fetchUsersFromAPI();
    const createdUsers = await prisma.user.createMany({
      data: usersToInsert,
      skipDuplicates: true, // To skip inserting duplicates
    });

    console.log('Inserted users:', createdUsers);
  } catch (error) {
    console.error('Error inserting users into database:', error);
  } 
  // finally {
  //   await prisma.$disconnect();
  // }
}


