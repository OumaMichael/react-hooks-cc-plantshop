import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPlants();
  }, []);

  // Fetch all plants from the API
  const fetchPlants = () => {
    fetch("http://localhost:6001/plants")
      .then((r) => r.json())
      .then((plantsData) => setPlants(plantsData))
      .catch((error) => console.error("Error fetching plants:", error));
  };

  // Add a new plant to the database
  const handleAddPlant = (newPlant) => {
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(newPlant),
    })
      .then((r) => r.json())
      .then((addedPlant) => {
        setPlants([...plants, addedPlant]);
      })
      .catch((error) => console.error("Error adding plant:", error));
  };

  // Toggle plant's in-stock status
  const toggleInStock = (id) => {
    const updatedPlants = plants.map((plant) => {
      if (plant.id === id) {
        return { ...plant, inStock: plant.inStock === undefined ? false : !plant.inStock };
      }
      return plant;
    });
    setPlants(updatedPlants);
  };

  // Filter plants based on search term
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <PlantList plants={filteredPlants} onToggleInStock={toggleInStock} />
    </main>
  );
}

export default PlantPage;