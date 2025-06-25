import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../index.css";

const Place = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [expendedImage, setExpendedImage] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

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
    if (!userId) return alert("Você precisa estar logado para reservar.");
    if (!checkIn || !checkOut) return alert("Preencha as datas corretamente.");
    if (!place.photos || place.photos.length === 0 || !place.photos[0]) {
      return alert("Erro: este anúncio não possui foto principal.");
    }

    const reserva = {
      place_id: Number(place.id),
      user_id: Number(userId),
      check_in: new Date(checkIn).toISOString().split("T")[0],
      check_out: new Date(checkOut).toISOString().split("T")[0],
      guests: Number(guests),
      price: Number(place.price),
      titulo: place.title,
      endereco: place.address,
      foto: place.photos[0], // ou com URL completa se preferir
    };

    //console.log("Reserva que será enviada:", reserva);

    try {
      await axios.post("http://localhost:8000/bookings", reserva);
      alert("Reserva realizada com sucesso!");
    } catch (err) {
      console.error("Erro ao fazer reserva:", err);
      alert("Erro ao fazer reserva. Tente novamente.");
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold">{place.title}</h1>
      <p className="mb-6 flex font-bold text-gray-600">
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
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>

        {place.address}
      </p>

      {/* Galeria de fotos */}
      <div className="mx-auto flex max-h-[80vh] w-full max-w-7xl gap-2 overflow-hidden sm:max-h-[70vh] md:max-h-[60vh] lg:max-h-[500px]">
        {place.photos.map((photo, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className={`cursor-pointer overflow-hidden rounded-3xl transition-all duration-500 ease-in-out ${
              expendedImage === index ? "basis-[60%]" : "basis-[20%]"
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

      <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-2">
        {/* Descrição principal */}
        <div className="p-6">
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
                    className="bg-primary-button items-center justify-center rounded-xl px-3 py-1 text-sm text-white"
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
              <h3 className="mt-6 mb-2 text-xl font-semibold">
                Informações Extras
              </h3>
              <p className="text-gray-700">{place.extras}</p>
              <p className="text-gray-700">
                <b>Check-In: </b>
                {place.checkin}
              </p>
              <p className="text-gray-700">
                <b>Check-Out: </b>
                {place.checkin}
              </p>
              <p className="text-gray-700">
                <b>Max. Convidados: </b>
                {place.person}
              </p>
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
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full cursor-text rounded-full border border-gray-300 px-4 py-2"
            />
          </div>

          <div className="mb-4">
            <label className="mb-1 block font-medium">Check-out</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full cursor-text rounded-full border border-gray-300 px-4 py-2"
            />
          </div>

          <div className="mb-4">
            <label className="mb-1 block font-medium">Nº de Convidados</label>
            <input
              type="number"
              min={1}
              max={place.person}
              placeholder={place.person}
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full cursor-text rounded-full border border-gray-300 px-4 py-2"
            />
          </div>

          <button
            onClick={handleReserve}
            className="bg-primary-400 hover:bg-primary-button w-full cursor-pointer rounded-full px-4 py-4 text-white"
          >
            Reservar
          </button>
        </div>
      </div>
    </section>
  );
};

export default Place;
