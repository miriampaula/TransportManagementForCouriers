// import { stringify } from "json5";
import { useEffect, useState } from "react";
import Button from "../components/Button";

const StatusPage = () => {
  const [statuses, setStatuses] = useState([]);
  useEffect(() => {
    const getStatuses = async () => {
      try {
        const statuses = await fetch(`${process.env.REACT_APP_BASE_URL}/data/status`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        let statusesJson = await statuses.json();
        statusesJson = statusesJson.map((s) => ({ ...s, editMode: false }));
        setStatuses(statusesJson);
        console.log({ statusesJson });
      } catch (error) {
        console.log("Users::setStatuses::", error);
      }
    };
    getStatuses();
  }, []);

  const updateStatus = async (status) => {
    console.log({ updateStatus: status });
    const statuses = await fetch(`http://localhost:80/api/data/status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...status, editMode: undefined }),
    });
    let statusesJson = await statuses.json();
    statusesJson = statusesJson.map((s) => ({ ...s, editMode: false }));
    setStatuses(statusesJson);
  };

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

  const addRow = async () => {
    try {
      const table = document.querySelector("table");
      const newRow = document.createElement("tr");
      newRow.className = "border-b border-gray-200 hover:bg-gray-100";

      const numeInput = document.createElement("input");
      numeInput.type = "text";
      numeInput.name = "nume";

      numeInput.className =
        "border border-gray-300 rounded px-2 py-1 bg-gray-100";

      newRow.appendChild(createCell(numeInput));

      const tipStatusInput = document.createElement("select");
      tipStatusInput.className =
        "border border-gray-300 rounded px-2 py-1 bg-gray-100";
      tipStatusInput.name = "tipStatus";

      const option1 = document.createElement("option");
      option1.value = "colet";
      option1.textContent = "colet";
      tipStatusInput.appendChild(option1);

      const option2 = document.createElement("option");
      option2.value = "factura";
      option2.textContent = "factura";
      tipStatusInput.appendChild(option2);

      newRow.appendChild(createCell(tipStatusInput));

      const statusDesignInput = document.createElement("input");
      statusDesignInput.type = "text";
      statusDesignInput.name = "statusDesign";

      statusDesignInput.className =
        "border border-gray-300 rounded px-2 py-1 bg-gray-100";

      newRow.appendChild(createCell(statusDesignInput));

      const buttonCell = document.createElement("td");
      const actionButton = document.createElement("button");
      actionButton.type = "button";
      actionButton.className =
        "text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800";
      actionButton.innerHTML = String.fromCharCode(0x2713);
      actionButton.addEventListener("click", add_status_to_db);
      buttonCell.appendChild(actionButton);
      newRow.appendChild(buttonCell);

      table.appendChild(newRow);
    } catch (error) {
      console.log(error);
    }
  };

  function createCell(content) {
    const cell = document.createElement("td");
    cell.className = "py-3 px-6 text-left";
    cell.appendChild(content);
    return cell;
  }

  function add_status_to_db() {
    const numeInput = document.querySelector('input[name="nume"]');
    const tipStatusInput = document.querySelector('select[name="tipStatus"]');
    const statusDesignInput = document.querySelector(
      'input[name="statusDesign"]'
    );

    const statusData = {
      nume: numeInput.value,
      tipStatus: tipStatusInput.value,
      statusDesign: statusDesignInput.value,
    };
    add_query(statusData)
      .then((response) => {
        console.log("Status added successfully:", response);
        window.location.reload();
      })
      .catch((error) => {
        console.log("Error adding status:", error);
      });
  }

  async function add_query(statusData) {
    try {
      const response = await fetch("http://localhost:80/api/data/status", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(statusData),
      });

      if (!response.ok) {
        throw new Error("Failed to update status in the database.");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(
        `Error updating status in the database: ${error.message}`
      );
    }
  }

  const editRow = async (
    statusId,
    statusName,
    tipStatus,
    statusDesign,
    index
  ) => {
    alert(index + 1);

    deleteRow(statusId);
  };

  return (

    <div className="overflow-x-auto">
      <div className="h-screen bg-gradient-to-br from-green-50 to-indigo-100 grid place-items-center">
        <div className="w-full lg:w-5/6">
          <button
            id="addStatusButton"
            onClick={() => addRow()}
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Adauga status nou
          </button>

          <div className="bg-white shadow-md rounded my-6">
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr
                  style={{ backgroundColor: "#F6F9FE" }} className="bg-gray-80 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Nume</th>
                  <th className="py-3 px-6 text-left">Tip Status</th>
                  <th className="py-3 px-6 text-center">Design</th>
                  <th className="py-3 px-6 text-center"></th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {statuses.map((status, index) => (
                  <tr
                    className="border-b border-gray-200 hover:bg-gray-100"
                    key={status.Id}
                    id={`${index + 1}`}
                  >
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="24"
                            height="24"
                            viewBox="0 0 48 48"
                            style={{ fill: "#000000" }}
                          >
                            <path
                              fill="#80deea"
                              d="M24,34C11.1,34,1,29.6,1,24c0-5.6,10.1-10,23-10c12.9,0,23,4.4,23,10C47,29.6,36.9,34,24,34z M24,16	c-12.6,0-21,4.1-21,8c0,3.9,8.4,8,21,8s21-4.1,21-8C45,20.1,36.6,16,24,16z"
                            ></path>
                            <path
                              fill="#80deea"
                              d="M15.1,44.6c-1,0-1.8-0.2-2.6-0.7C7.6,41.1,8.9,30.2,15.3,19l0,0c3-5.2,6.7-9.6,10.3-12.4c3.9-3,7.4-3.9,9.8-2.5	c2.5,1.4,3.4,4.9,2.8,9.8c-0.6,4.6-2.6,10-5.6,15.2c-3,5.2-6.7,9.6-10.3,12.4C19.7,43.5,17.2,44.6,15.1,44.6z M32.9,5.4	c-1.6,0-3.7,0.9-6,2.7c-3.4,2.7-6.9,6.9-9.8,11.9l0,0c-6.3,10.9-6.9,20.3-3.6,22.2c1.7,1,4.5,0.1,7.6-2.3c3.4-2.7,6.9-6.9,9.8-11.9	c2.9-5,4.8-10.1,5.4-14.4c0.5-4-0.1-6.8-1.8-7.8C34,5.6,33.5,5.4,32.9,5.4z"
                            ></path>
                            <path
                              fill="#80deea"
                              d="M33,44.6c-5,0-12.2-6.1-17.6-15.6C8.9,17.8,7.6,6.9,12.5,4.1l0,0C17.4,1.3,26.2,7.8,32.7,19	c3,5.2,5,10.6,5.6,15.2c0.7,4.9-0.3,8.3-2.8,9.8C34.7,44.4,33.9,44.6,33,44.6z M13.5,5.8c-3.3,1.9-2.7,11.3,3.6,22.2	c6.3,10.9,14.1,16.1,17.4,14.2c1.7-1,2.3-3.8,1.8-7.8c-0.6-4.3-2.5-9.4-5.4-14.4C24.6,9.1,16.8,3.9,13.5,5.8L13.5,5.8z"
                            ></path>
                            <circle
                              cx="24"
                              cy="24"
                              r="4"
                              fill="#80deea"
                            ></circle>
                          </svg>
                        </div>
                        {!status.editMode && (
                          <span name="continut-nume" className="font-medium">
                            {status.nume}
                          </span>
                        )}
                        {status.editMode && (
                          <input
                            value={status.nume}
                            onChange={(e) => {
                              status.nume = e.target.value;
                              setStatuses([...statuses]);
                            }}
                            className="border border-gray-300 rounded px-2 py-1 bg-gray-100"
                          />
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <div className="flex items-center">
                        <div className="mr-2"></div>
                        {!status.editMode && (
                          <span name="continut-tipstatus">
                            {status.TipStatus}
                          </span>
                        )}
                        {status.editMode && (
                          <input
                            value={status.TipStatus}
                            onChange={(e) => {
                              status.TipStatus = e.target.value;
                              setStatuses([...statuses]);
                            }}
                            className="border border-gray-300 rounded px-2 py-1 bg-gray-100"
                          />
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      {!status.editMode && (
                        <div className="flex items-center justify-center">
                          <span name="continut-statusdesign">
                            {status.StatusDesign}
                          </span>
                        </div>
                      )}
                      {status.editMode && (
                        <input
                          value={status.StatusDesign}
                          onChange={(e) => {
                            status.StatusDesign = e.target.value;
                            setStatuses([...statuses]);
                          }}
                          className="border border-gray-300 rounded px-2 py-1 bg-gray-100"
                        />
                      )}
                    </td>

                    <td className="py-3 px-3 text-center">
                      <div className="flex item-center justify-center">
                        <div className="w-4 mr-2 transform hover:text-green-500 hover:scale-110">
                          {!status.editMode && (
                            <svg
                              onClick={() => {
                                console.info({ status });
                                status.editMode = !status.editMode;
                                setStatuses([...statuses]);
                              }}
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              />
                            </svg>
                          )}
                          {status.editMode && (
                            <span onClick={() => updateStatus(status)}>✓</span>
                          )}
                        </div>
                        <div className="w-4 mr-2 transform hover:text-red-500 hover:scale-110">
                          <svg
                            onClick={() => deleteRow(status.Id)}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div >

  );
};

export default StatusPage;
