import { useState } from "react";
import Perks from "../componentes/Perks";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { FormValidator } from "../utils/FormsValidator.js";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const NewPlace = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [photos, setPhotos] = useState([]); // arquivos de fotos novas
  const [photoPreviews, setPhotoPreviews] = useState([]); // urls para preview
  const [existingPhotos, setExistingPhotos] = useState([]); // Caminhos das fotos já salvas
  const [deletedExistingPhotos, setDeletedExistingPhotos] = useState([]); //estado para armazenar as fotos removidas

  const [description, setDescription] = useState("");
  const [extras, setExtras] = useState("");
  const [price, setPrice] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [person, setPerson] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [perks, setPerks] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validador do formulário: verifica se todos os campos obrigatórios estão preenchidos corretamente
    const validator = new FormValidator({
  title,
  address,
  description,
  extras,
  photos: photoPreviews,       // fotos novas do input
  previewPhotos: existingPhotos, // fotos já salvas no banco
  checkin,
  checkout,
});

const erros = validator.validarTodos();


    if (erros.length > 0) {
      alert("Corrija os seguintes erros:\n\n" + erros.join("\n"));
      return;
    }

    try {
      // Recupera o usuário logado do localStorage
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.id) {
        alert("Usuário não está logado.");
        return;
      }
      const user_id = user.id;
      let uploadedPhotoPaths = [];
      let postId = id;
      // 1. Se for novo post, cria primeiro sem fotos (para obter o postId)
      if (!postId) {
        const payloadSemFotos = {
          user_id: String(user_id),
          title: String(title),
          address: String(address),
          photos: [],
          deleted_photos: [],
          description: String(description),
          perks: Array.isArray(perks) ? perks.map(String) : [],
          extras: String(extras),
          price: parseFloat(price) || 0,
          checkin: String(checkin),
          checkout: String(checkout),
          person: parseInt(person) || 1,
        };
        // Cria o post sem fotos e pega o id retornado
        const res = await axios.post(
          "http://localhost:8000/places/",
          payloadSemFotos,
        );
        postId = res.data.id;
      }
      // 2. Upload das fotos para a rota correta, já com user_id e postId
      if (photos.length > 0) {
        const formData = new FormData();
        photos.forEach((file) => formData.append("files", file));
        // Envia as imagens para o backend, que irá nomear corretamente
        const uploadRes = await axios.post(
          `http://localhost:8000/places/upload/${user_id}/${postId}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        );
        uploadedPhotoPaths = uploadRes.data; // Recebe os caminhos das imagens salvas
      }
      // 3. Atualiza o post com as fotos (inclui fotos antigas e novas)
      const payload = {
        user_id: String(user_id),
        title: String(title),
        address: String(address),
        photos: [
          ...(Array.isArray(existingPhotos) ? existingPhotos.map(String) : []),
          ...(Array.isArray(uploadedPhotoPaths) ? uploadedPhotoPaths.map(String) : []),
        ],
        deleted_photos: deletedExistingPhotos,
        description: String(description),
        perks: Array.isArray(perks) ? perks.map(String) : [],
        extras: String(extras),
        price: parseFloat(price) || 0,
        checkin: String(checkin),
        checkout: String(checkout),
        person: parseInt(person) || 1,
      };
      // Atualiza o post com as informações finais
      await axios.put(`http://localhost:8000/places/${postId}`, payload);
      setRedirect(true); // Redireciona após sucesso
    } catch (error) {
      // Exibe mensagem de erro detalhada caso ocorra falha
      let msg = "Erro ao salvar acomodação!\n";
      if (error?.response?.data?.detail) {
        if (typeof error.response.data.detail === "string") {
          msg += error.response.data.detail;
        } else if (Array.isArray(error.response.data.detail)) {
          msg += error.response.data.detail.map((e) => e.msg).join("\n");
        } else {
          msg += JSON.stringify(error.response.data.detail);
        }
      }
      alert(msg);
      console.error(error);
    }
  };

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);

    // Atualiza os arquivos
    setPhotos((prev) => [...prev, ...files]);

    // Gera os previews
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPhotoPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removePhoto = (indexToRemove) => {
    setPhotoPreviews((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const removeExistingPhoto = (indexToRemove) => {
    setDeletedExistingPhotos((prev) => [
      ...prev,
      existingPhotos[indexToRemove],
    ]);
    setExistingPhotos((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  useEffect(() => {
    if (!id) return;

    axios.get(`http://localhost:8000/places/${id}`).then((res) => {
      const data = res.data;
      setTitle(data.title);
      setAddress(data.address);
      setDescription(data.description);
      setExtras(data.extras);
      setPrice(data.price);
      setCheckin(data.checkin);
      setCheckout(data.checkout);
      setPerson(data.person);
      setPerks(data.perks || []);
      setExistingPhotos(data.photos || []);
    });
  }, [id]);

  if (redirect) return <Navigate to="/account/places" />;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-6 p-6 md:p-25"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="ml-2 text-2xl font-bold">
          Titulo
        </label>
        <input
          type="text"
          placeholder="Digite o título do seu anúncio"
          className="rounded-full border border-gray-300 px-4 py-2"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="address" className="ml-2 text-2xl font-bold">
          Endereço
        </label>
        <input
          type="text"
          placeholder="Digite o endereço do seu anúncio [Estado, Bairro]"
          className="rounded-full border border-gray-300 px-4 py-2"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="photos" className="ml-2 text-2xl font-bold">
          Fotos
        </label>
        {/*<div className="flex gap-2">
          <input
            type="text"
            placeholder="Adicione o link da foto"
            className="grow rounded-full border border-gray-300 px-4 py-2"
            id="photos"
            value={photos}
            onChange={(e) => setPhotos(e.target.value)}
          />
          <button onClick={uploadByLink}  className="cursor-pointer rounded-full border border-gray-300 bg-gray-100 px-4 py-2 transition hover:bg-gray-200">
            Enviar foto
          </button>
        </div>*/}
        <div className="mt-2 grid grid-cols-5 gap-4">
          <label
            htmlFor="file"
            className="flex aspect-square w-42 cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-gray-300 sm:w-auto"
          >
            <input
              type="file"
              id="file"
              className="hidden"
              multiple
              accept="image/*"
              onChange={handlePhotoChange}
            />
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
                d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
              />
            </svg>
            Upload
          </label>
          {/* Fotos existentes (vindas do backend) */}
          {existingPhotos.map((photoPath, index) => (
            <div
              key={`existing-${index}`}
              className="relative aspect-square overflow-hidden rounded-2xl border border-dashed border-gray-300"
            >
              <button
                onClick={() => removeExistingPhoto(index)}
                className="absolute inset-0 z-10 flex items-center justify-center bg-black/0 text-white/0 opacity-100 transition duration-200 hover:bg-black/50 hover:text-white"
                type="button"
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
              </button>
              <img
                src={`http://localhost:8000/${photoPath}`}
                alt={`existing-${index}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}

          {/* Fotos novas (upload atual) */}
          {photoPreviews.map((src, index) => (
            <div
              key={`new-${index}`}
              className="relative aspect-square overflow-hidden rounded-2xl border border-dashed border-gray-300"
            >
              <button
                onClick={() => removePhoto(index)}
                className="absolute inset-0 z-10 flex items-center justify-center bg-black/0 text-white/0 opacity-100 transition duration-200 hover:bg-black/50 hover:text-white"
                type="button"
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
              </button>
              <img
                src={src}
                alt={`preview-${index}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="ml-2 text-2xl font-bold">
          Descrição
        </label>
        <textarea
          placeholder="Descrição do seu anúncio"
          className="h-56 resize-none rounded-2xl border border-gray-300 px-4 py-2"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="perks" className="ml-2 text-2xl font-bold">
          Comodidades
        </label>

        <Perks perks={perks} setPerks={setPerks} />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="extras" className="ml-2 text-2xl font-bold">
          Informações extras
        </label>
        <textarea
          placeholder="Adicione informações extras"
          className="h-56 resize-none rounded-2xl border border-gray-300 px-4 py-2"
          id="extras"
          value={extras}
          onChange={(e) => setExtras(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="ml-2 text-2xl font-bold">Restrições e preço</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(225px,1fr))] gap-6">
          <div className="flex flex-col gap-2">
            <label className="ml-2 text-xl font-bold" htmlFor="price">
              Preço
            </label>
            <input
              type="number"
              min={0}
              placeholder="Valor"
              className="rounded-full border border-gray-300 px-4 py-2"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="ml-2 text-xl font-bold" htmlFor="checkin">
              Check-In
            </label>
            <input
              type="time"
              required
              className="cursor-text rounded-full border border-gray-300 px-4 py-2"
              id="checkin"
              value={checkin}
              onChange={(e) => setCheckin(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="ml-2 text-xl font-bold" htmlFor="checkout">
              Check-Out
            </label>
            <input
              type="time"
              required
              className="cursor-text rounded-full border border-gray-300 px-4 py-2"
              id="checkout"
              value={checkout}
              onChange={(e) => setCheckout(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="ml-2 text-xl font-bold" htmlFor="person">
              Nº Convidados
            </label>
            <input
              type="number"
              min={0}
              placeholder="Pessoas"
              className="rounded-full border border-gray-300 px-4 py-2"
              id="person"
              value={person}
              onChange={(e) => setPerson(e.target.value)}
            />
          </div>
        </div>
      </div>
      <button className="bg-primary-button hover:bg-primary-button-500 min-w-44 cursor-pointer rounded-full px-4 py-2 text-center text-white transition">
        Salvar nova acomodação
      </button>
    </form>
  );
};

export default NewPlace;
