import { useState } from "react";
import { useZxing } from "react-zxing";
import Button from "./Button";

const Scanner = () => {
  const results = [];
  const [result, setResult] = useState("");
  const [isPaused, setIsPaused] = useState(false);

  const { ref } = useZxing({
    paused: isPaused,
    onResult(result) {
      setResult(result.getText());
    },
  });

  return (
    <div className="flex flex-col items-center">
      <video ref={ref} className="w-5/6 h-96" />
      <div>
        <p>Last result:</p>
        <p>{result}</p>
      </div>
      <Button
        text={isPaused ? "Start" : "Stop"}
        onClick={() => setIsPaused(!isPaused)}
      />
    </div>
  );
};

export default Scanner;
