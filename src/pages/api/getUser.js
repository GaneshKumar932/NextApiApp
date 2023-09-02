export default async function handler(req, res) {
    try {
      
      const user = await prisma.users.findFirst({
        where: {
          userid: user.id
        },
      })
      if(user){
        res.send({ status: 200, data: user, message: "Get user details successfully" });
      }else{
        res.send({ status: 204, data: user, message: "User not found" });
      }
    } catch (err) {
      console.log(`Get user Error: `, err);
      res.send({ message: "Something Went Wrong", status: 404 });
    }
  }