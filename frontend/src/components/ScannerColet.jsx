import { useState, useEffect } from "react";
import { useZxing } from "react-zxing";
import Button from "./Button";
import beep from "../assets/beep.mp3";

const Scanner = ({ handleResult }) => {



  const [audio] = useState(new Audio(beep));
  const [result, setResult] = useState("");
  const [results, setResults] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [error, setError] = useState(null);


  const { ref } = useZxing({
    paused: isPaused,
    timeBetweenDecodingAttempts: 300,
    onResult(result) {
      setResult(result.getText());
      setResults((prevState) => [...prevState, result]);
      handleResult(result.getText());
      audio.play();

    },
    onError(error) {
      setError(error.text);
    },
  });

  useEffect(() => {
    const updateColet = async () => {
      try {

        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/data/colet?idColet=${result}`,  
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
          }

        );
  
        if (!response.ok) {
          throw new Error(`HTTP request failed with status ${response.status}`);
        }
  
        const responseJson = await response.json();
        console.log(responseJson);
      } catch (error) {
        console.error('Error occurred during HTTP request:', error);
      }
    };
  
    updateColet();
  }, [result]);
  

  const handleInputChange = (event) => {
    setResult(event.target.value);
  };

  return (
    <div className="flex flex-col items-center">
      <video ref={ref} className="w-full mb-8" />
      <div>
      <input value={result} readOnly onChange={handleInputChange} />
      </div>
      <Button
        text={isPaused ? "Start" : "Stop"}
        onClick={() => setIsPaused(!isPaused)}
      />
      {error && <div>{error}</div>}
    </div >
  );
};

export default Scanner;