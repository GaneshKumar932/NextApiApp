import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  const userId = req.query.id;

  if (req.method === 'GET') {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: parseInt(userId),
        },
      });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Unable to fetch user' });
    }
  } else if (req.method === 'PUT') {
    const {name, username, email, phone, website } = req.body;
    try {
        const updatedUser = await prisma.user.update({
          where: {
            id: parseInt(userId),
          },
          data: {
            name,
            username,
            email,
            phone,
            website
          },
        });
        res.status(200).json(updatedUser);
      } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Unable to update user' });
      }
    // Handle user update similar to the previous example
  } else if (req.method === 'DELETE') {
    try {
        await prisma.user.delete({
          where: {
            id: parseInt(userId),
          },
        });
        res.status(204).end();
      } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Unable to delete user' });
      }
    // Handle user deletion similar to the previous example
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
