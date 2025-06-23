import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Place = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [expendedImage, setExpendedImage] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8000/places/${id}`)
      .then((res) => setPlace(res.data))
      .catch((err) => console.error("Erro ao carregar acomodação:", err));
  }, [id]);

  if (!place) return <div className="p-10 text-center">Carregando...</div>;

  const handleClick = (index) => {
    setExpendedImage(index);
  };

  const handleReserve = async () => {
    setMessage("");
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      setMessage("Você precisa estar logado para reservar.");
      return;
    }
    try {
      await axios.post("http://localhost:8000/bookings", {
        user_id: user.id,
        place_id: place.id,
        check_in: checkIn,
        check_out: checkOut,
        price: place.price,
        guests: guests,
      });
      setMessage("Reserva realizada com sucesso!");
    } catch (err) {
      setMessage("Erro ao realizar reserva.");
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold">{place.nome}</h1>
      <p className="mb-6 text-gray-600">{place.endereco}</p>

      {/* Galeria de fotos */}
      <div className="mx-auto flex h-[80vh] w-full max-w-7xl items-center gap-2 overflow-hidden">
        {place.photos.map((photo, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className={`aspect-square cursor-pointer overflow-hidden rounded-3xl transition-all duration-500 ease-in-out ${
              expendedImage === index ? "basis-[60%]" : "basis-[30%]"
            }`}
          >
            <img
              src={`http://localhost:8000/${photo}`}
              alt={`Foto ${index + 1}`}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-[2fr_1fr]">
        {/* Descrição principal */}
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Descrição</h2>
          <p className="leading-relaxed text-gray-800">{place.description}</p>

          {/* Comodidades */}
          {place.perks?.length > 0 && (
            <>
              <h3 className="mt-6 mb-2 text-xl font-semibold">Comodidades</h3>
              <ul className="flex flex-wrap gap-3">
                {place.perks.map((perk, index) => (
                  <li
                    key={index}
                    className="rounded-full bg-gray-200 px-3 py-1 text-sm"
                  >
                    {perk}
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Extras */}
          {place.extras && (
            <div className="mt-6">
              <h3 className="mb-2 text-xl font-semibold">Informações Extras</h3>
              <p className="text-gray-700">{place.extras}</p>
            </div>
          )}
        </div>

        {/* Card de Reserva */}
        <div className="rounded-2xl bg-gray-100 p-6 shadow-md">
          <h3 className="mb-4 text-2xl font-bold">
            Preço: R$ {place.price} por noite
          </h3>

          <div className="mb-4">
            <label className="mb-1 block font-medium">Check-in</label>
            <input
              type="date"
              className="w-full rounded-md border border-gray-300 p-2"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="mb-1 block font-medium">Check-out</label>
            <input
              type="date"
              className="w-full rounded-md border border-gray-300 p-2"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="mb-1 block font-medium">Nº de Convidados</label>
            <input
              type="number"
              className="w-full rounded-md border border-gray-300 p-2"
              value={guests}
              min={1}
              onChange={(e) => setGuests(Number(e.target.value))}
            />
          </div>

          <button
            className="w-full rounded-md py-2 text-white  bg-primary-400 hover:bg-primary-button cursor-pointer"
            onClick={handleReserve}
          >
            Reservar
          </button>
          {message && (
            <div className="mt-2 text-center text-sm text-red-500">
              {message}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Place;
