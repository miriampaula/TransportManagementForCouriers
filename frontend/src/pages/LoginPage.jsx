import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useState} from "react";

const BASE_URL = "http://localhost:80/api";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  localStorage.setItem("email", email);
  localStorage.setItem("password", password);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/loginUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const responseText = await response.text();
      console.log(responseText);
      if (response.status === 200) {
        alert("Login reusit... navigare pe pagina HOME");
        navigate("/home");
      } else {
        setError(responseText);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex w-full justify-center p-20">
      <form className="flex flex-col items-center justify-around border w-3/4 lg:w-2/4 h-96">
        <h1 className="text-2xl font-bold">Log in</h1>
        <input
          className="border-gray-400 border-2 text-gray-900 outline-none text-sm rounded-md p-3 focus:border-sky-500 lg:w-2/4"
          type="text"
          placeholder="Email"
          required
          autoComplete="off"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          className="border-gray-400 border-2 text-gray-900 outline-none text-sm rounded-md p-3 focus:border-sky-500 lg:w-2/4"
          type="password"
          placeholder="Password"
          required
          autoComplete="off"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        {/* <Input name ="salut" type="text" placeholder={"Adauga"}/> */}
        <Button text="Login" onClick={handleSubmit} 
        />
        <div className="flex text-lg">
          <p>Nu ai cont?</p>
          <Link className="ml-2 underline text-blue-500" to="/register">
            Înregistrează-te
          </Link>
        </div>
        {error ? <div className="text-red-600">{error}</div> : null}
      </form>
    </div>
  );
};

export default LoginPage;
