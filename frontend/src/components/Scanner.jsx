import { useState } from "react";
import { useZxing} from "react-zxing";
import Button from "./Button";

const Scanner = ()=>{
    const [result, setResult] =useState("");
    const [isPaused, setPaused] = useState(false);
    const results = [];

    const {ref} = useZxing({
        paused: isPaused,
        timeBetweenDecodingAttempts:3000,
        onResult (result){
            setResult(result.getText);

        },
    });

    return (
        <div className="flex flex-col items-center">
            <video ref={ref} className="w-5/6"/>
            <div>
                <p>Last result</p>
                <p>{result}</p>
            </div>
            <Button 
            text= {isPaused ? "Start" : "Stop"}
            onClick={()=>setPaused(!isPaused)} />
        </div>
    )
}

export default Scanner;