import Item from "../componentes/Item";
import { useEffect, useState } from "react";
import axios from "axios";
// Importa o hook do contexto de busca para acessar o termo pesquisado
import { useSearch } from "../utils/SearchContext";

const Home = () => {
  // Estado para armazenar todas as acomodações
  const [places, setPlaces] = useState([]);
  // Pega o termo de busca do contexto
  const { search } = useSearch();

  useEffect(() => {
    // Busca todas as acomodações do backend ao carregar a página
    axios
      .get("http://localhost:8000/places/all")
      .then((res) => setPlaces(res.data))
      .catch((err) => console.error("Erro ao buscar acomodações:", err));
  }, []);

  // Filtra as acomodações conforme o termo de busca
  const filteredPlaces = places.filter((place) => {
    if (!search) return true; // Se não há busca, mostra tudo
    const keyword = search.toLowerCase();
    // Verifica se a palavra aparece no título, endereço ou descrição
    return (
      place.title?.toLowerCase().includes(keyword) ||
      place.address?.toLowerCase().includes(keyword) ||
      place.description?.toLowerCase().includes(keyword)
    );
  });

  return (
    <section>
      {/* Mostra as acomodações filtradas em formato de grid */}
      <div className="mx-auto grid max-w-7xl grid-cols-[repeat(auto-fit,minmax(225px,1fr))] gap-8 px-4 py-8">
        {filteredPlaces.map((place) => (
          <Item key={place.id} place={place} />
        ))}
      </div>
    </section>
  );
};

export default Home;
