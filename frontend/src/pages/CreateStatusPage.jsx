import React, { useState } from "react";
import Button from "../components/Button";

const CreateStatusPage = () => {
  const [statusData, setStatusData] = useState({
    nume: "",
    tipStatus: "",
    statusDesign: ""
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/status`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(statusData),
        }
      );
      const resposneText = await response.text();
      console.log(response);
      if (response.status === 201) {
        console.log("Success");
      } else {
        setError(resposneText);
      }
    } catch (error) {
      console.log("CreateStatusPage::handleSubmit::", error.message);
    }
  };

  return (
    <div className="flex w-full justify-center p-4">
      <form className="flex flex-col items-center justify-around border-gray-200 border-2 rounded-md w-3/4 lg:w-2/4 h-96">
        <input
          className="lg:w-3/4 border-gray-400 border-2 text-gray-900 outline-none text-sm rounded-md p-3 focus:border-sky-500"
          type="text"
          placeholder="Nume"
          required
          autoComplete="off"
          onChange={(e) =>
            setStatusData({ ...statusData, nume: e.target.value })
          }
        />
        <input
          className="lg:w-3/4 border-gray-400 border-2 text-gray-900 outline-none text-sm rounded-md p-3 focus:border-sky-500"
          type="text"
          placeholder="Tip Status"
          required
          autoComplete="off"
          onChange={(e) =>
            setStatusData({ ...statusData, tipStatus: e.target.value })
          }
        />
        <input
          className="lg:w-3/4 border-gray-400 border-2 text-gray-900 outline-none text-sm rounded-md p-3 focus:border-sky-500"
          type="text"
          placeholder="Design Status"
          required
          autoComplete="off"
          onChange={(e) =>
            setStatusData({ ...statusData, statusDesign: e.target.value })
          }
        />
        <Button text="Create Status" onClick={handleSubmit} />
        {error ? <div className="text-red-600">{error}</div> : null}
      </form>
    </div>
  );
};

export default CreateStatusPage;
