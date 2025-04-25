import React from "react";

function PlantCard({ plant, onToggleInStock }) {
  const { id, name, image, price, inStock = true } = plant;

  const handleToggleClick = () => {
    onToggleInStock(id);
  };

  return (
    <li className="card" data-testid="plant-item">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      {inStock ? (
        <button className="primary" onClick={handleToggleClick}>
          In Stock
        </button>
      ) : (
        <button onClick={handleToggleClick}>
          Out of Stock
        </button>
      )}
    </li>
  );
}

export default PlantCard;