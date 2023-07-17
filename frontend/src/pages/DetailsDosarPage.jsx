import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../components/Button";

const DetailsDosarPage = () => {
  const { id } = useParams();
  const [dosar, setDosar] = useState(null);

  useEffect(() => {
    const getDosarData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/data/dosartransport?id=${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const [dosarData] = await response.json();
        if (!dosarData) {
          return alert("Acest dosar nu există în baza de date!");
        }
        console.log(dosarData);
        setDosar(dosarData);
      } catch (error) {
        console.log("Error while fetching dosar data:", error.message);
      }
    };

    getDosarData();
  }, [id]);

  if (!dosar) {
    return <div>Loading...</div>;
  }

  const formatBooleanValue = (value) => {
    if (value === null) {
      return "NU";
    }
    return value ? "DA" : "NU";
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="max-w-md bg-white border border-gray-300 rounded-md shadow-md p-6 mt-8">
        <div className="mb-4">
          <strong>Nume:</strong> {dosar.Nume}
        </div>
        <div className="mb-4">
          <strong>Descriere:</strong> {dosar.Descriere}
        </div>
        <div className="mb-4">
          <strong>Paletare:</strong> {formatBooleanValue(dosar.Paletare)}
        </div>
        <div className="mb-4">
          <strong>QR:</strong> {dosar.QR}
        </div>
        <div className="mb-4">
          <strong>Creat de:</strong> {dosar.CreatDe}
        </div>
        <div className="mb-4">
          <strong>Creat la:</strong> {dosar.CreatLa}
        </div>
        <div className="mb-4">
          <strong>Sofer:</strong> {dosar.Sofer}
        </div>
        <div className="mb-4">
          <strong>Auto:</strong> {dosar.Auto}
        </div>
        <div className="mb-4">
          <strong>Scanat încărcare:</strong> {formatBooleanValue(dosar.ScanatIncarcare)}
        </div>
      </div>
      <div className="mt-8 space-x-4">
        <Link
          to={`/updatedosar/${id}`}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none focus:ring focus:ring-yellow-300"
        >
          Editează
        </Link>
        <Link
          to="/dosar-transport"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Înapoi la Listă
        </Link>
      </div>
    </div>
  );
};

export default DetailsDosarPage;
