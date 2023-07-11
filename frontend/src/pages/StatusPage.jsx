// import { stringify } from "json5";
import { useEffect, useState } from "react";
import Button from "../components/Button";

const StatusPage = () => {
  const [statuses, setStatuses] = useState([]);
  useEffect(() => {
    const getStatuses = async () => {
      try {
        const statuses = await fetch(`http://localhost:80/api/data/status`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const statusesJson = await statuses.json();
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
      const statuses = await fetch(
        `http://localhost:80/api/data/status?id=${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const statusesJson = await statuses.json();
      setStatuses(statusesJson);
      console.log({ statusesJson });
    } catch (error) {
      console.log("Users::setStatuses::", error);
    }
  };

  return (
    <div>
      <table className="table-auto">
        <thead>
          <tr>
            <th>Nume</th>
            <th>TipStatus</th>
            <th>Design</th>
          </tr>
        </thead>
        <tbody>
          {statuses.map((status) => (
            <tr key={status.Id}>
              <td>{status.nume}</td>
              <td>{status.TipStatus}</td>
              <td>{status.StatusDesign}</td>
              <td>
                <Button
                  onClick={() => deleteRow(status.Id)}
                  text="sterge"
                ></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatusPage;
