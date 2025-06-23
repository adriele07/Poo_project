import NewPlace from "../componentes/NewPlace";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const AccPlaces = () => {
  const { action } = useParams();
  const [places, setPlaces] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost:8000/places/user/${userId}`)
      .then((res) => setPlaces(res.data))
      .catch((err) => console.error("Erro ao buscar acomodações:", err));
  }, [userId]);

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir esta acomodação?"))
      return;

    try {
      await axios.delete(`http://localhost:8000/places/${id}`);
      setPlaces((prev) => prev.filter((place) => place.id !== id));
    } catch (err) {
      console.error("Erro ao excluir acomodação:", err);
      alert("Erro ao excluir. Tente novamente.");
    }
  };

  return (
    <div className="flex w-full max-w-7xl flex-col items-center">
      {action !== "new" ? (
        <div className="flex w-full flex-col items-center gap-8">
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

          {places.map((place) => (
            <Link
              to={`/account/places/${place.id}`}
              className="flex w-full items-center gap-6 rounded-2xl bg-gray-100 p-6 lg:w-[80%]"
              key={place.id}
            >
              {place.photos?.length > 0 && (
                <img
                  className="aspect-square max-w-56 rounded-2xl object-cover object-center"
                  src={`http://localhost:8000/${place.photos[0]}`}
                  alt="Foto da acomodação"
                />
              )}
              <div className="flex flex-col gap-2">
                <p className="text-xl font-medium">{place.title}</p>
                <p className="">{place.description}</p>
                <div>
                  <button
                    onClick={() => handleDelete(place.id)}
                    className="rounded-full bg-red-500 px-4 py-1 text-white hover:bg-red-600"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <NewPlace />
      )}
    </div>
  );
};

export default AccPlaces;
