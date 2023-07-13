import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../components/Button";

const FacturiDosarPage = () => {
  const { id } = useParams();
  const [dosar, setDosar] = useState(null);
  const [facturi, setFacturi] = useState([]);
  const [colete, setColete] = useState([]);
  const BASE_URL = "http://localhost:80/api/data";

  useEffect(() => {
    const getDosarData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/facturidosar?idDosar=${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const responseJson = await response.json();
        const [[dosar], facturi, colete] = responseJson;
        console.table(facturi);
        console.table(colete);
        if (!dosar) {
          return alert("Acest dosar nu există în baza de date!");
        }
        setDosar(dosar);
        setFacturi(facturi);
        setColete(colete);
      } catch (error) {
        console.log("Error while fetching dosar data:", error.message);
      }
    };
    getDosarData();
    // incepe scanare
    // 
  }, [id]);

  if (!dosar) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="max-w-md bg-white border border-gray-300 rounded-md shadow-md p-6 mt-8">
        <div className="mb-4">
          <strong>Nume:</strong> {dosar.Nume}
        </div>
        <div className="mb-4">
          <strong>Descriere:</strong> {dosar.Descriere}
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

export default FacturiDosarPage;
