import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../App";
import Button from "../components/Button";

const ScanDosarPage = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { idDosar } = useParams();
  const [dosar, setDosar] = useState({});

  useEffect(() => {
    const validateDosar = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/data/dosartransport?id=${idDosar}`
        );
        const [responseJson] = await response.json();
        if (!responseJson) {
          alert("Dosarul nu s-a gasit in Baza de Date !");
          return navigate("/home");
        }
        console.log(responseJson);
        setDosar(responseJson);
      } catch (err) {
        console.error(err);
      }
    };

    validateDosar();
  }, []);

  const handleSubmit = () => {
    alert(`User data: ${JSON.stringify(user)}`);
    localStorage.setItem('userContext', JSON.stringify(user));
  }
  return (
    <div>
      <h2>{dosar.Nume}</h2>
      <h1> {user.role} </h1>

      <form className="flex flex-col items-center justify-around border-gray-200 border-2 rounded-md w-3/4 lg:w-2/4 h-96">
        <input
          className=" lg:w-3/4  border-gray-400 border-2 text-gray-900 outline-none text-sm rounded-md p-3 focus:border-sky-500"
          type="text"
          placeholder="Name"
          required
          autoComplete="off"
          onChange={(e) => setUser({...user, name: e.target.value})}
        />
           <input
          className=" lg:w-3/4  border-gray-400 border-2 text-gray-900 outline-none text-sm rounded-md p-3 focus:border-sky-500"
          type="text"
          placeholder="Auto"
          required
          autoComplete="off"
          onChange={(e) => setUser({...user, auto: e.target.value})}
        />
          <Button text="salvare" onClick={handleSubmit} />
      </form>
    </div>
  );
};

export default ScanDosarPage;
