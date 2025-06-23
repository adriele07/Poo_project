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
              to={`/places/${place.id}`}
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
                    className="flex rounded-full bg-red-500 px-4 py-2 gap-2  text-white hover:bg-red-600"
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
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
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
