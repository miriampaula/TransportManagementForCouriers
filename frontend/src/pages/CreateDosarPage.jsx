import React, { useState } from "react";
import Button from "../components/Button";
import { v4 as uuidv4 } from "uuid";

const CreateDosarPage = () => {
  const [dosarData, setDosarData] = useState({
    nume: "",
    descriere: "",
    paletare: false,
    qr: "",
    creatDe: "",
    creatLa: new Date().toISOString().slice(0, 19),
    sofer: "",
    auto: "",
    scanatIncarcare: null
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newDosarData = {
        ...dosarData,
        qr: uuidv4(),
        creatLa: new Date().toISOString().slice(0, 19),
        scanatIncarcare: dosarData.scanatIncarcare
          ? new Date(dosarData.scanatIncarcare).toISOString().slice(0, 19)
          : null
      };

      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/data/dosartransport`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDosarData),
      });

      if (response.ok) {
        console.log("Dosar added successfully");
        // Redirect the user to the home page
        window.location.href = "/dosar-transport";
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (error) {
      console.log("Error while adding dosar:", error.message);
    }
  };

  return (
    <div className="flex w-full justify-center p-4">
      <form className="flex flex-col items-center justify-around border-gray-200 border-2 rounded-md w-3/4 lg:w-2/4 h-96">
        <input
          className="lg:w-3/4 border-gray-400 border-2 text-gray-900 outline-none text-sm rounded-md p-3 focus:border-sky-500"
          type="text"
          placeholder="Nume"
          required
          autoComplete="off"
          value={dosarData.nume}
          onChange={(e) =>
            setDosarData((prevState) => ({
              ...prevState,
              nume: e.target.value,
            }))
          }
        />
        <input
          className="lg:w-3/4 border-gray-400 border-2 text-gray-900 outline-none text-sm rounded-md p-3 focus:border-sky-500"
          type="text"
          placeholder="Descriere"
          required
          autoComplete="off"
          value={dosarData.descriere}
          onChange={(e) =>
            setDosarData((prevState) => ({
              ...prevState,
              descriere: e.target.value,
            }))
          }
        />
        <select
          className="lg:w-3/4 border-gray-400 border-2 text-gray-900 outline-none text-sm rounded-md p-3 focus:border-sky-500"
          required
          value={dosarData.paletare ? "DA" : "NU"}
          onChange={(e) =>
            setDosarData((prevState) => ({
              ...prevState,
              paletare: e.target.value === "DA",
            }))
          }
        >
          <option value="DA">DA</option>
          <option value="NU">NU</option>
        </select>
        <input
          className="lg:w-3/4 border-gray-400 border-2 text-gray-900 outline-none text-sm rounded-md p-3 focus:border-sky-500"
          type="text"
          placeholder="CreatDe"
          required
          autoComplete="off"
          value={dosarData.creatDe}
          onChange={(e) =>
            setDosarData((prevState) => ({
              ...prevState,
              creatDe: e.target.value,
            }))
          }
        />
        <input
          className="lg:w-3/4 border-gray-400 border-2 text-gray-900 outline-none text-sm rounded-md p-3 focus:border-sky-500"
          type="text"
          placeholder="Auto"
          required
          autoComplete="off"
          value={dosarData.auto}
          onChange={(e) =>
            setDosarData((prevState) => ({
              ...prevState,
              auto: e.target.value,
            }))
          }
        />
        <input
          className="lg:w-3/4 border-gray-400 border-2 text-gray-900 outline-none text-sm rounded-md p-3 focus:border-sky-500"
          type="text"
          placeholder="Sofer"
          required
          autoComplete="off"
          value={dosarData.sofer}
          onChange={(e) =>
            setDosarData((prevState) => ({
              ...prevState,
              sofer: e.target.value,
            }))
          }
        />
        <input
          className="lg:w-3/4 border-gray-400 border-2 text-gray-900 outline-none text-sm rounded-md p-3 focus:border-sky-500"
          type="datetime-local"
          placeholder="Scanat Incarcare"
          autoComplete="off"
          value={dosarData.scanatIncarcare || ""}
          onChange={(e) =>
            setDosarData((prevState) => ({
              ...prevState,
              scanatIncarcare: e.target.value || null,
            }))
          }
        />
        <Button text="Create Dosar" onClick={handleSubmit} />
        {error && <div className="text-red-600">{error}</div>}
      </form>
    </div>
  );
};

export default CreateDosarPage;
