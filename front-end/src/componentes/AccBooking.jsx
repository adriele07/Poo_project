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
                  className="rounded-full bg-red-500 px-4 py-1 text-white hover:bg-red-600"
                >
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
