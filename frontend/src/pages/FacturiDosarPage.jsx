import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import Scanner from "../components/Scanner";

const FacturiDosarPage = () => {
  const { idDosar } = useParams();
  const [codbare, setCodbare] = useState("");
  const [scanMode, setScanMode] = useState(false);
  const [dosar, setDosar] = useState(null);
  const [facturi, setFacturi] = useState([]);
  const [colete, setColete] = useState([]);
  const [activeIndex, setActiveIndex] = useState([]);
  const [coletstatus, setcoletstatus] = useState([]);
  const [isDivGreen, setIsDivGreen] = useState([]);

  const handleAccordionClick = (index) => {
    if (activeIndex.includes(index)) {
      setActiveIndex(activeIndex.filter((i) => i !== index));
    } else {
      setActiveIndex([...activeIndex, index]);
    }
  };

  const handleAccordionClickForColet = (index) => {
    if (coletstatus.includes(index)) {
      setcoletstatus(coletstatus.filter((i) => i !== index));
    } else {
      setcoletstatus([...coletstatus, index]);
    }
  };

  useEffect(() => {
    const putDosarData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/data/facturidosar`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ codbare, idDosar }),
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
        return console.log("Error while fetching dosar data:", error.message);
      }
      // start scan
    };
    putDosarData();
  }, [codbare]);
  useEffect(() => {
    const getDosarData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/data/facturidosar?idDosar=${idDosar}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

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
        setScanMode(true);
      } catch (error) {
        return console.log("Error while fetching dosar data:", error.message);
      }
      // start scan
    };
    getDosarData();
  }, [idDosar]);

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
      {scanMode && <Scanner handleResult={setCodbare}></Scanner>}
      <div className="h-screen bg-gradient-to-br from-green-50 to-indigo-100 grid place-items-center">
        <div className="w-full sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 mx-auto rounded border">
          <div className="bg-white p-10 shadow-sm">
            <div className="flex items-center">
              <h6 className="text-3xl font-large text-gray-800 mr-4">
                Dosar Transport Actual
              </h6>
              <button
                className="button-17"
                role="button"
                style={{ marginLeft: "auto" }}
              >
                Scaneaza dosar nou
              </button>
            </div>
            <div className="h-1 mx-auto border-b my-5"></div>

            {facturi.map((item, index) => (
              <div
                key={index}
                className={`transition hover:bg-indigo-50 ${
                  activeIndex.includes(index) ? "bg-indigo-50" : ""
                }`}
              >
                <div
                  className="accordion-header cursor-pointer transition flex space-x-5 px-5 items-center h-16"
                  onClick={() => handleAccordionClick(index)}
                >
                  <FontAwesomeIcon
                    icon={activeIndex.includes(index) ? faMinus : faPlus}
                    className="fas"
                  />
                  <h4 className="text-xl ">
                    {item.SerieNumar} - {item.Valoare}
                  </h4>
                </div>

                <div
                  className="accordion-content px-5 pt-0 overflow-hidden"
                  style={{
                    maxHeight: activeIndex.includes(index) ? "1000px" : "0px",
                  }}
                >
                  {colete
                    .filter((e) => e.IdFactura == item.IdFactura)
                    .map((item, index) => (
                      <div
                        key={index}
                        className={`transition hover:bg-indigo-80 ${
                          coletstatus.includes(index) ? "bg-indigo-100" : ""
                        } ${
                          isDivGreen.includes(index)
                            ? "bg-green-300"
                            : "bg-indigo-100"
                        }`}
                      >
                        <div
                          className="accordion-header cursor-pointer transition flex space-x-5 px-5 items-center h-16"
                          onClick={() => handleAccordionClickForColet(index)}
                        >
                          <h3>
                            {item.Articol} - {item.Colet}
                          </h3>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacturiDosarPage;
