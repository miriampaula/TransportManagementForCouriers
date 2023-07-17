import React, { useEffect, useState } from "react";
import { Navigate, redirect, useNavigate, useParams } from "react-router-dom";

const ScanDosarPage = () => {
  const { idDosar } = useParams();
  const [dosar, setDosar] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const validateDosar = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/data/dosartransport?id=${idDosar}`
        );
        const [responseJson] = await response.json();
        if (!responseJson) {
          alert("Dosarul nu s-a gasit in baza de date!");
          return navigate("/home");
        }
        console.log(responseJson);
        setDosar(responseJson);
      } catch (error) {
        console.error(error);
      }
    };

    validateDosar();
  }, []);

  return (
    <div>
      <h1>text</h1>
      <h2>{dosar.Nume}</h2>
    </div>
  );
};

export default ScanDosarPage;
