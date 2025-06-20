import React from "react";
import NewPlace from "../componentes/NewPlace";
import { Link, useParams } from "react-router-dom";

const AccPlaces = () => {
  const { action } = useParams();

  return (
    <div className="w-full max-w-7xl flex flex-col items-center">
      {action !== "new" ? (
        <Link
          to="/account/places/new"
          className="bg-primary-400 hover:bg-primary-500 flex min-w-44 cursor-pointer gap-2 rounded-full px-4 py-2 text-white transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          Nova acomodação
        </Link>
      ) : <NewPlace/>}
    </div>
  );
};

export default AccPlaces;
