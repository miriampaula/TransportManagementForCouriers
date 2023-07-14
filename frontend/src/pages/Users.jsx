// import { stringify } from "json5";
import { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const users = await fetch(`${process.env.REACT_APP_BASE_URL}/query`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: "getUsersQuery",
          }),
        });
        const usersJson = await users.json();
        setUsers(usersJson);

        console.log(usersJson);
      } catch (error) {
        console.log("Users::getUsers::", error);
      }
    };
    getUsers();
  }, []);
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <h1>{user.email}</h1>
          <p>{user.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Users;