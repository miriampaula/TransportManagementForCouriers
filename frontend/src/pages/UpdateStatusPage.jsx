// UpdateStatusPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "../components/Button";

const UpdateStatusPage = () => {
  const { id } = useParams();
  const [nume, setNume] = useState("");
  const [tipStatus, setTipStatus] = useState("");
  const [statusDesign, setStatusDesign] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const getStatusData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/data/status?id=${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const [statusData] = await response.json();
        if(!statusData){
          return alert('Acest status nu exista in baza de date !');
        }
        console.log(statusData);
        setNume(statusData.nume);
        setTipStatus(statusData.TipStatus);
        setStatusDesign(statusData.StatusDesign);
      } catch (error) {
        console.log("Error while fetching status data:", error.message);
      }
    };

    getStatusData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/data/status?id=${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nume, tipStatus, statusDesign }),
      });

      if (response.ok) {
        console.log("Status updated successfully");
        // Redirecționează utilizatorul către pagina Home
        window.location.href = "/status";
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (error) {
      console.log("Error while updating status:", error.message);
    }
  };

  return (
    <div className="flex w-full justify-center p-4">
      <form className="flex flex-col items-center justify-around border-gray-200 border-2 rounded-md w-3/4 lg:w-2/4 h-96">
        <input
          className="lg:w-3/4 border-gray-400 border-2 text-gray-900 outline-none text-sm rounded-md p-3 focus:border-sky-500"
          type="text"
          placeholder="Nume"
          name="nume"
          required
          autoComplete="off"
          value={nume}
          onChange={(e) => setNume(e.target.value)}
        />
        <input
          className="lg:w-3/4 border-gray-400 border-2 text-gray-900 outline-none text-sm rounded-md p-3 focus:border-sky-500"
          type="text"
          placeholder="Tip Status"
          name="tipStatus"
          required
          autoComplete="off"
          value={tipStatus}
          onChange={(e) => setTipStatus(e.target.value)}
        />
        <input
          className="lg:w-3/4 border-gray-400 border-2 text-gray-900 outline-none text-sm rounded-md p-3 focus:border-sky-500"
          type="text"
          placeholder="Design Status"
          name="statusDesign"
          required
          autoComplete="off"
          value={statusDesign}
          onChange={(e) => setStatusDesign(e.target.value)}
        />
        <Button text="Update Status" onClick={handleSubmit} />
        {error && <div className="text-red-600">{error}</div>}
      </form>
    </div>
  );
};

export default UpdateStatusPage;
