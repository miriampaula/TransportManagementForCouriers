import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const StatusPage = () => {
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    const getStatuses = async () => {
      try {
        const response = await fetch(`http://localhost:80/api/data/status`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const statusesJson = await response.json();
        setStatuses(statusesJson);

        console.log({ statusesJson });
      } catch (error) {
        console.log("Users::setStatuses::", error);
      }
    };

    getStatuses();
  }, []);

  const deleteRow = async (id) => {
    try {
      await fetch(`http://localhost:80/api/data/status?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const updatedStatuses = statuses.filter((status) => status.Id !== id);
      setStatuses(updatedStatuses);
    } catch (error) {
      console.log("Users::deleteRow::", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-3xl">
        <table className="w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          <thead>
            <tr>
              <th className="py-4 px-6 text-left border-b-2 border-gray-300 text-lg font-bold">Nume</th>
              <th className="py-4 px-6 text-left border-b-2 border-gray-300 text-lg font-bold ">TipStatus</th>
              <th className="py-4 px-6 text-left border-b-2 border-gray-300 text-lg font-bold">Design</th>
              <th className="py-4 px-6 text-left border-b-2 border-gray-300 text-lg font-bold"></th>
            </tr>
          </thead>
          <tbody>
            {statuses.map((status, index) => (
              <tr key={status.Id} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                <td className="py-3 px-6 border-b border-gray-300">{status.nume}</td>
                <td className="py-3 px-6 border-b border-gray-300 ">{status.TipStatus}</td>
                <td className="py-3 px-6 border-b border-gray-300">{status.StatusDesign}</td>
                <td className="py-3 px-6 border-b border-gray-300">
                  <div className="flex gap-2">
                    <Button
                      onClick={() => deleteRow(status.Id)}
                      text="Șterge"
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
                    />
                    
                    <Link
                      to={`/updatestatus/${status.Id}`}
                      className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none focus:ring focus:ring-yellow-300"
                    >
                      Editează
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4">
          <a
            href="/createstatus"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
          >
            Crează
          </a>
        </div>
      </div>
    </div>
  );
};

export default StatusPage;
