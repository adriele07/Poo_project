import React from "react";
import { Link } from "react-router-dom";

const Item = ({ place }) => {
  if (!place) return null;

  return (
    <Link to={`/places/${place.id}`} className="flex flex-col gap-2">
      <img
        className="aspect-square rounded-3xl object-cover"
        src={`http://localhost:8000/${place.photos?.[0]}`}

        alt={place.title}
      />
      <div>
        <h3 className="text-xl font-semibold">{place.address}</h3>
        <p className="text-1xl truncate text-gray-600">{place.description}</p>
      </div>
      <p>
        <span className="font-semibold">R${place.price}</span> por noite
      </p>
    </Link>
  );
};

export default Item;