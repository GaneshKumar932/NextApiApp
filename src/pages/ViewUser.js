import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const ViewUser = () => {
  const router = useRouter();
  const { user } = router.query;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserData(parsedUser);
    }
  }, [user]);

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>User Details</h2>
      <p>ID: {userData.id}</p>
      <p>Username: {userData.username}</p>
      {/* Other user details */}
    </div>
  );
};

export default ViewUser;
