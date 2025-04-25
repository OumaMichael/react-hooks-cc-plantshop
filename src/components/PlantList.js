import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, onToggleInStock }) {
  return (
    <ul className="cards">
      {plants.map((plant) => (
        <PlantCard 
          key={plant.id} 
          plant={plant} 
          onToggleInStock={onToggleInStock} 
        />
      ))}
    </ul>
  );
}

export default PlantList;