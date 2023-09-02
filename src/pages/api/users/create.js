import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  console.log("11111--->");

  const {name, username, email, phone, website} = req.body;

  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        username, 
        email, 
        phone, 
        website
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Unable to create user' });
  }
}
