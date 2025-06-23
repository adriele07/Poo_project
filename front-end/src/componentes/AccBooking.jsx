import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const AccBooking = () => {
  const { action } = useParams();
  const [bookings, setBookings] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost:8000/bookings/${userId}`)
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Erro ao buscar reservas:", err));
  }, [userId]);

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir esta reserva?")) return;
    try {
      await axios.delete(`http://localhost:8000/bookings/${id}`);
      setBookings((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error("Erro ao excluir reserva:", err);
      alert("Erro ao excluir. Tente novamente.");
    }
  };

  return (
    <div className="flex w-full max-w-7xl flex-col items-center">
      <div className="flex w-full flex-col items-center gap-8">
        {bookings.map((booking) => (
          <Link
            to={`/places/${booking.place_id}`}
            className="flex w-full items-center gap-6 rounded-2xl bg-gray-100 p-6 lg:w-[80%]"
            key={booking.id}
          >
            {booking.foto && (
              <img
                className="aspect-square max-w-56 rounded-2xl object-cover object-center"
                src={`http://localhost:8000/${booking.foto}`}
                alt="Foto da acomodação"
              />
            )}
            <div className="flex flex-col gap-2">
              <p className="text-xl font-medium">{booking.titulo}</p>
              <p className="text-gray-600">{booking.endereco}</p>
              <p className="text-sm text-gray-500">
                Check-in: {booking.check_in} | Check-out: {booking.check_out}
              </p>
              <p className="text-sm text-gray-500">
                Hóspedes: {booking.guests}
              </p>
              <p className="text-sm text-gray-500">Valor: R$ {booking.price}</p>
              <div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(booking.id);
                  }}
                  className="flex gap-2 rounded-full bg-red-500 px-4 py-2 text-white hover:bg-red-600"
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
    </div>
  );
};

export default AccBooking;
