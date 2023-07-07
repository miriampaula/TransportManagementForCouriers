import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useState, useEffect } from "react";
import Input from "../components/Input";

const BASE_URL = "http://localhost:80/api";

const LoginPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const onChange = (field, value) => {
    setUserData({ ...userData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/loginUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const responseText = await response.text();
      if (response.status === 200) {
        console.log("success");
        alert("Login reusit... navigare pe pagina HOME");
        navigate("/");
      } else {
        setError(responseText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    <div className="flex w-full justify-center p-4">
      <form className="flex flex-col items-center justify-around border w-3/4 h-96 px-2">
        <Input
          placeholder="email"
          name="email"
          type="email"
          onChange={(e) => onChange(e.target.name, e.target.value)}
        />
        <Input
          placeholder="password"
          name="password"
          type="password"
          onChange={(e) => onChange(e.target.name, e.target.value)}
        />
        <Button text="Login" onClick={handleSubmit} />
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
