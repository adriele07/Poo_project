import React, { useEffect, useState } from "react";
import axios from "axios";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      setBookings([]);
      setLoading(false);
      return;
    }
    axios
      .get(`http://localhost:8000/bookings/${user.id}`)
      .then((res) => setBookings(res.data))
      .catch((err) => setError("Erro ao carregar reservas."))
      .finally(() => setLoading(false));
  }, [refresh]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/bookings/${id}`);
      setRefresh((r) => !r);
    } catch (err) {
      alert("Erro ao excluir reserva.");
    }
  };

  if (loading) return <div>Carregando reservas...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="p-8">
      <h2 className="text-2xl font-bold mb-4">Minhas Reservas</h2>
      {bookings.length === 0 ? (
        <div>Nenhuma reserva encontrada.</div>
      ) : (
        <ul className="space-y-4">
          {bookings.map((booking) => (
            <li
              key={booking.id}
              className="border rounded-lg p-4 flex items-center justify-between"
            >
              <div>
                <div>ID da Reserva: {booking.id}</div>
                <div>ID do Usuário: {booking.user_id}</div>
                <div>ID do Local: {booking.place_id}</div>
              </div>
              <button
                className="ml-4 rounded bg-red-500 px-3 py-1 text-white hover:bg-red-700"
                onClick={() => handleDelete(booking.id)}
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default BookingList;
