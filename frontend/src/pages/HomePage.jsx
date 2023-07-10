import { useEffect } from "react";
import Scanner from "../components/Scanner";

export default function HomePage() {
  useEffect(() => {
    sql.query('test');
  }, []);
  return (
    <div>
      
      <Scanner />
    </div>
  );
}
