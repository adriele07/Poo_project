import Item from "../componentes/Item";
import { useEffect, useState } from "react";
import axios from "axios";
import FadeInLog from "../utils/FadeInLog";

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
      <FadeInLog duration={800} delay={300}>
        <div className="mx-auto grid max-w-7xl grid-cols-[repeat(auto-fit,minmax(225px,1fr))] gap-8 px-4 py-8">
          {places.map((place) => (
            <Item key={place.id} place={place} />
          ))}
        </div>
      </FadeInLog>
    </section>
  );
};

export default Home;