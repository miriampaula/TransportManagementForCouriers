import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../App";
import Button from "../components/Button";

const ScanDosarPage = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { idDosar } = useParams();
  const [dosar, setDosar] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [datePersonaleConfirmate, setDatePersonaleConfirmate] = useState(false);

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

  return (
    <div>
      <h2>{dosar.Nume}</h2>
      <h1> {user.role} </h1>

      {datePersonaleConfirmate ? (
        <div>
          <Button
            text="Incepe scanare colete"
            onClick={() => {
              setUser({ ...user });
              navigate(`scan-colet`);
            }}
          />
        </div>
      ) : user.name && !editMode ? (
        <div>
          <p>Datele tale personale sun corecte ?</p>
          <p>{user.name}</p>
          <p>{user.auto}</p>
          <Button
            text="Confirm"
            onClick={() => setDatePersonaleConfirmate(true)}
          />
          <Button text="Modific" onClick={() => setEditMode(true)} />
        </div>
      ) : (
        <form className="flex flex-col items-center justify-around border-gray-200 border-2 rounded-md w-3/4 lg:w-2/4 h-96">
          <input
            className=" lg:w-3/4  border-gray-400 border-2 text-gray-900 outline-none text-sm rounded-md p-3 focus:border-sky-500"
            type="text"
            placeholder="Completează nume și prenume"
            required
            autoComplete="off"
            defaultValue={user.name}
            onChange={(e) => (user.name = e.target.value)}
          />
          <input
            className=" lg:w-3/4  border-gray-400 border-2 text-gray-900 outline-none text-sm rounded-md p-3 focus:border-sky-500"
            type="text"
            placeholder="Completeaza număr auto"
            required
            autoComplete="off"
            defaultValue={user.auto}
            onChange={(e) => (user.auto = e.target.value)}
          />
          <Button
            text="salvare"
            onClick={() => {
              setUser({ ...user });
              setDatePersonaleConfirmate(true);
            }}
          />
        </form>
      )}
    </div>
  );
};

export default ScanDosarPage;
