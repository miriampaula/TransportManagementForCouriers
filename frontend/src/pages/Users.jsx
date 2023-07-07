import { useEffect } from "react";

const Users = () => {
    useEffect(() => {
        const getusers = async () => {
            try {

                const users = await fetch('$(process.env.REACT_APP_BASE_URL)/query', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        query: 'getUsersQuery'
                    })

                });
                console.log(users);
            } catch (err) {
                console.log("Users:: getUsers :: ", err);
            }
        }
        getusers();
        
    }, [])
    return (
        <div>

        </div>
    )
}

export default Users;