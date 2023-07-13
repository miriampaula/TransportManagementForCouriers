import React from "react";
import Accordion from "../components/Accordion";

const DosarTransportPage = () => {
  const [dosare, setDosare] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getDosare = async () => {
      try {
        const response = await fetch(`/api/data/dosartransport`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const dosareJson = await response.json();
        setDosare(dosareJson);

        console.log({ dosareJson });
      } catch (error) {
        console.log("DosarTransportPage::setDosare::", error);
      }
    };

    getDosare();
  }, []);

  const deleteDosar = async (id) => {
    try {
      await fetch(`/api/data/dosartransport?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const updatedDosare = dosare.filter((dosar) => dosar.Id !== id);
      setDosare(updatedDosare);
    } catch (error) {
      console.log("DosarTransportPage::deleteDosar::", error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredDosare = dosare.filter((dosar) =>
    dosar.Nume.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Accordion />
    </div>
  );
};

export default App;
