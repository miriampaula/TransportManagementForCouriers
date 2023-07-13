import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "../components/Button";

const UpdateDosarPage = () => {
  const { id } = useParams();
  const [nume, setNume] = useState("");
  const [descriere, setDescriere] = useState("");
  const [paletare, setPaletare] = useState("");
  const [qr, setQR] = useState("");
  const [creatDe, setCreatDe] = useState("");
  const [creatLa, setCreatLa] = useState("");
  const [sofer, setSofer] = useState("");
  const [auto, setAuto] = useState("");
  const [scanatLivrare, setScanatLivrare] = useState(new Date().toISOString().slice(0, 16));
  const [error, setError] = useState("");
  const BASE_URL = "http://localhost:80/api/data";

  useEffect(() => {
    const getDosarData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/dosartransport?id=${id}`, {
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
        setNume(dosarData.Nume);
        setDescriere(dosarData.Descriere);
        setPaletare(dosarData.Paletare);
        setQR(dosarData.QR);
        setCreatDe(dosarData.CreatDe);
        setCreatLa(dosarData.CreatLa);
        setSofer(dosarData.Sofer);
        setAuto(dosarData.Auto);
        setScanatLivrare(dosarData.ScanatLivrare);
      } catch (error) {
        console.log("Error while fetching dosar data:", error.message);
      }
    };

    getDosarData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/dosartransport?id=${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nume,
          descriere,
          paletare,
          qr,
          creatDe,
          creatLa,
          sofer,
          auto,
          scanatLivrare,
        }),
      });

      if (response.ok) {
        console.log("Dosar updated successfully");
        // Redirecționează utilizatorul către pagina Home
        window.location.href = "/dosar-transport";
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (error) {
      console.log("Error while updating dosar:", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-sm mt-10">
      <div className="w-full max-w-sm">
        <form className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="nume">
                Nume:
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="nume"
                type="text"
                placeholder="Nume"
                required
                autoComplete="off"
                value={nume}
                onChange={(e) => setNume(e.target.value)}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="descriere">
                Descriere:
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="descriere"
                type="text"
                placeholder="Descriere"
                required
                autoComplete="off"
                value={descriere}
                onChange={(e) => setDescriere(e.target.value)}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="paletare">
                Paletare:
              </label>
            </div>
            <div className="md:w-2/3">
              <select
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="paletare"
                value={paletare}
                onChange={(e) => setPaletare(e.target.value)}
              >
                <option value="0">NU</option>
                <option value="1">DA</option>
              </select>
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="qr">
                QR:
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="qr"
                type="text"
                placeholder="QR"
                required
                autoComplete="off"
                value={qr}
                onChange={(e) => setQR(e.target.value)}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="creatDe">
                Creat de:
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="creatDe"
                type="text"
                placeholder="Creat de"
                required
                autoComplete="off"
                value={creatDe}
                onChange={(e) => setCreatDe(e.target.value)}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="creatLa">
                Creat la:
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="creatLa"
                type="text"
                placeholder="Creat la"
                required
                autoComplete="off"
                value={creatLa}
                onChange={(e) => setCreatLa(e.target.value)}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="sofer">
                Șofer:
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="sofer"
                type="text"
                placeholder="Șofer"
                required
                autoComplete="off"
                value={sofer}
                onChange={(e) => setSofer(e.target.value)}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="auto">
                Auto:
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="auto"
                type="text"
                placeholder="Auto"
                required
                autoComplete="off"
                value={auto}
                onChange={(e) => setAuto(e.target.value)}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="scanatLivrare">
                Scanat încărcare:
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="scanatLivrare"
                type="datetime-local"
                required
                autoComplete="off"
                value={scanatLivrare}
                onChange={(e) => setScanatLivrare(e.target.value)}
              />
            </div>
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <Button text="Update Dosar" onClick={handleSubmit} />
            </div>
          </div>
          {error && <div className="text-red-600">{error}</div>}
        </form>
      </div>
    </div>
    </div>
  );
};

export default UpdateDosarPage;
