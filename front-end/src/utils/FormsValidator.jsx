export function validarFormulario({
  title,
  address,
  description,
  extras,
  photos,
  previewPhotos = [],
  checkin,
  checkout,
}) {
  const erros = [];
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0); // Zera hora para comparação

  const limiteMaximo = new Date();
  limiteMaximo.setFullYear(limiteMaximo.getFullYear() + 10); // +10 anos

  if (!title.trim()) erros.push("O título é obrigatório.");
  if (!address.trim()) erros.push("O endereço é obrigatório.");
  if (!description.trim()) erros.push("A descrição é obrigatória.");
  if (!extras.trim()) erros.push("As informações extras são obrigatórias.");

  // Aqui está a lógica alterada:
  const semFotosNovas = photos.length === 0;
  const semFotosPreview = previewPhotos.length === 0;

  if (semFotosNovas && semFotosPreview) {
    erros.push("Pelo menos uma foto deve ser enviada.");
  }

  if (!checkin) {
    erros.push("A data de check-in é obrigatória.");
  } else {
    const dataCheckin = new Date(checkin);
    if (dataCheckin < hoje) {
      erros.push("A data de check-in deve ser hoje ou no futuro.");
    }
    if (dataCheckin > limiteMaximo) {
      erros.push("A data de check-in não pode ser mais de 10 anos no futuro.");
    }
  }

  if (!checkout) {
    erros.push("A data de check-out é obrigatória.");
  } else {
    const dataCheckout = new Date(checkout);
    if (dataCheckout < hoje) {
      erros.push("A data de check-out deve ser hoje ou no futuro.");
    }
    if (dataCheckout > limiteMaximo) {
      erros.push("A data de check-out não pode ser mais de 10 anos no futuro.");
    }
  }

  if (checkin && checkout && new Date(checkout) <= new Date(checkin)) {
    erros.push("O check-out deve ser depois do check-in.");
  }

  return erros;
}