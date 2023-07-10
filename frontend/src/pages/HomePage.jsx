import { useEffect } from "react";
import Scanner from "../components/Scanner";
import sql from "../services/SqlService";

export default function HomePage() {
  useEffect(() => {
    sql.query('test');
  }, []);
  return (
    <body>
      <Scanner />
    </body>
  );
}
