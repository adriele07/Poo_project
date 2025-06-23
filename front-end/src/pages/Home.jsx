import Item from "../componentes/Item";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/places/all")
      .then((res) => setPlaces(res.data))
      .catch((err) => console.error("Erro ao buscar acomodações:", err));
  }, []);

  return (
    <section>
      <div className="mx-auto grid max-w-7xl grid-cols-[repeat(auto-fit,minmax(225px,1fr))] gap-8 px-4 py-8">
        {places.map((place) => (
          <Item key={place.id} place={place} />
        ))}
      </div>
    </section>
  );
};

export default Home;
