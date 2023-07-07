<<<<<<< HEAD
import { useEffect, useState } from "react";
import Button from "../components/Button";

const RegisterPage = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });
  const [error, setError] = useState("");

=======
import { useState } from "react";
import Button from "../components/Button";
 
const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [error, setError] = useState("");
 
>>>>>>> 0e1d6f5ba342fa047ae279f92abb082d3a3c07f8
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/registerUser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
<<<<<<< HEAD
          body: JSON.stringify(userData),
=======
          body: JSON.stringify({ name, email, password, passwordRepeat }),
>>>>>>> 0e1d6f5ba342fa047ae279f92abb082d3a3c07f8
        }
      );
      const resposneText = await response.text();
      console.log(response);
      if (response.status === 201) {
        console.log("success");
      } else {
        setError(resposneText);
      }
    } catch (error) {
      console.log("RegisterPage::handleSubmit::", error.message);
    }
  };
<<<<<<< HEAD

  useEffect(() => {
    console.log(userData);
  }, [userData]);

=======
 
>>>>>>> 0e1d6f5ba342fa047ae279f92abb082d3a3c07f8
  return (
    <div className="flex w-full  justify-center p-4">
      <form className="flex flex-col items-center justify-around border-gray-200 border-2 rounded-md w-3/4 lg:w-2/4 h-96">
        <input
          className=" lg:w-3/4  border-gray-400 border-2 text-gray-900 outline-none text-sm rounded-md p-3 focus:border-sky-500"
          type="text"
          placeholder="Name"
          required
          autoComplete="off"
<<<<<<< HEAD
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
=======
          onChange={(e) => setName(e.target.value)}
>>>>>>> 0e1d6f5ba342fa047ae279f92abb082d3a3c07f8
        />
        <input
          className=" lg:w-3/4  border-gray-400 border-2 text-gray-900 outline-none text-sm rounded-md p-3 focus:border-sky-500"
          type="text"
          placeholder="Email"
          required
          autoComplete="off"
<<<<<<< HEAD
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
=======
          onChange={(e) => setEmail(e.target.value)}
>>>>>>> 0e1d6f5ba342fa047ae279f92abb082d3a3c07f8
        />
        <input
          className=" lg:w-3/4  border-gray-400 border-2 text-gray-900 outline-none text-sm rounded-md p-3 focus:border-sky-500"
          type="password"
          placeholder="Password"
          required
          autoComplete="off"
<<<<<<< HEAD
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
=======
          onChange={(e) => setPassword(e.target.value)}
>>>>>>> 0e1d6f5ba342fa047ae279f92abb082d3a3c07f8
        />
        <input
          className=" lg:w-3/4  border-gray-400 border-2 text-gray-900 outline-none text-sm rounded-md p-3 focus:border-sky-500"
          type="password"
          placeholder="Confirm password"
          required
          autoComplete="off"
<<<<<<< HEAD
          onChange={(e) =>
            setUserData({ ...userData, passwordRepeat: e.target.value })
          }
=======
          onChange={(e) => setPasswordRepeat(e.target.value)}
>>>>>>> 0e1d6f5ba342fa047ae279f92abb082d3a3c07f8
        />
        <Button text="register" onClick={handleSubmit} />
        {error ? <div className="text-red-600">{error}</div> : null}
      </form>
    </div>
  );
};
<<<<<<< HEAD

export default RegisterPage;
=======
 
export default RegisterPage;
>>>>>>> 0e1d6f5ba342fa047ae279f92abb082d3a3c07f8
