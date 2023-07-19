import { useEffect, useState } from "react";
import Scanner from "../components/Scanner";
import { useParams } from "react-router-dom";

const ScanColetPage = () => {
  const [scannedColeteCount, setScannedColeteCount] = useState(0);

  const [colete, setColete] = useState([]);
  const [codbare, setCodbare] = useState("");

  const { idDosar } = useParams();
  const getColetData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/data/colet?idDosar=${idDosar}`
    );
    const responseJson = await response.json();
    console.log("RESPONSE:", responseJson);

    setColete(responseJson);
    console.log("COLETE:", colete);
  };
  useEffect(() => {
    getColetData();
  }, []);

  useEffect(() => {
    const scanned = colete.filter((e) => e.ScanatIncarcare).length;
    setScannedColeteCount(scanned);
  }, [colete]);

  useEffect(() => {
    const putColet = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/data/colet?idColet=${codbare}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ idColet: codbare }),
          }
        );
        console.log("RESPONSE FROM PUT:", response);

        // Update the colete state with the latest data
        //    const coletData = await response.json();
        //      setColete(coletData);
      } catch (error) {
        return console.log("ERROR: ", error.message);
      }
      // start scan
    };
    putColet()
      .then(() => getColetData())
      .catch(console.error)
      .finally(() => console.log("Citire lista dosare - finnaly"));
  }, [codbare]);

  return (
    <div className="w-full flex items-center flex-col p-6">
      <Scanner handleResult={setCodbare}></Scanner>
      <div className="mt-10 flex items-center">
        Numar colete scanate:{" "}
        <p className="mx-2 text-xl">{scannedColeteCount}</p> din{" "}
        <p className="mx-2 text-xl">{colete.length}</p>
      </div>
    </div>
  );
};

export default ScanColetPage;
