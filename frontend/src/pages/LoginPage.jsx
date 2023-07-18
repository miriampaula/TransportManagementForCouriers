import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useState } from "react";
import Input from "../components/Input";
import { VariantType } from "../components/UseSnackbar";
import EnqueueSnackBar from "../components/UseSnackbar";

const LoginPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const enqueueSnackBar = EnqueueSnackBar();

  const onChange = (field, value) => {
    setUserData({ ...userData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/loginUser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      const responseText = await response.text();
      if (response.status === 200) {
        console.log("success");
        enqueueSnackBar(
          "Login reusit... navigare pe pagina HOME",
          VariantType.SUCCESS
        );
        navigate("/");
      } else {
        setError(responseText);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex w-full justify-center p-20">
      <form className="flex flex-col items-center justify-around border w-1/2 h-96 px-2">
        <h1 className="text-2xl font-bold">Log in</h1>
        <Input
          className="border-gray-400 border-2 text-gray-900 outline-none text-sm rounded-md p-3 focus:border-sky-500 lg:w-2/4"
          placeholder="Email"
          name="email"
          type="email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$"
          onChange={(e) => onChange(e.target.name, e.target.value)}
        />
        <Input
          className="border-gray-400 border-2 text-gray-900 outline-none text-sm rounded-md p-3 focus:border-sky-500 lg:w-2/4"
          placeholder="Password"
          name="password"
          type="password"
          onChange={(e) => onChange(e.target.name, e.target.value)}
        />
        {/* <Input name ="salut" type="text" placeholder={"Adauga"}/> */}
        <Button text="Login" onClick={handleSubmit} />
        <div className="flex text-lg">
          <p>Nu ai cont?</p>
          <Link className="ml-2 underline text-blue-500" to="/register">
            Register page
          </Link>
        </div>
        {error ? <div className="text-red-600">{error}</div> : null}
      </form>
    </div>
  );
};

export default LoginPage;
