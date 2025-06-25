export function validarFormulario({
  title,
  address,
  description,
  extras,
  photos = [],
  previewPhotos = [],
  checkin,
  checkout,
}) {
  const erros = [];
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0); // Zera a hora para comparação

  const limiteMaximo = new Date();
  limiteMaximo.setFullYear(limiteMaximo.getFullYear() + 10);

  // Só valida campos se forem fornecidos
  if (typeof title === "string" && !title.trim())
    erros.push("O título é obrigatório.");
  if (typeof address === "string" && !address.trim())
    erros.push("O endereço é obrigatório.");
  if (typeof description === "string" && !description.trim())
    erros.push("A descrição é obrigatória.");
  if (typeof extras === "string" && !extras.trim())
    erros.push("As informações extras são obrigatórias.");

  const semFotosNovas = photos.length === 0;
  const semFotosPreview = previewPhotos.length === 0;

  if (semFotosNovas && semFotosPreview) {
    erros.push("Pelo menos uma foto deve ser enviada.");
  }

  const totalFotos = photos.length + previewPhotos.length;
  if (totalFotos > 5) {
    erros.push("Você pode enviar no máximo 5 fotos.");
  }

  const isHora = (str) => /^\d{2}:\d{2}$/.test(str);
  const isData = (str) => /^\d{4}-\d{2}-\d{2}$/.test(str);

  // Validação de check-in
  if (!checkin) {
    erros.push("O valor de check-in é obrigatório.");
  } else if (!isData(checkin) && !isHora(checkin)) {
    erros.push("O check-in deve estar no formato 'YYYY-MM-DD' ou 'HH:MM'.");
  } else if (isData(checkin)) {
    const dataCheckin = new Date(checkin);
    if (dataCheckin < hoje) {
      erros.push("A data de check-in deve ser hoje ou no futuro.");
    }
    if (dataCheckin > limiteMaximo) {
      erros.push("A data de check-in não pode ser mais de 10 anos no futuro.");
    }
  }

  // Validação de check-out
  if (!checkout) {
    erros.push("O valor de check-out é obrigatório.");
  } else if (!isData(checkout) && !isHora(checkout)) {
    erros.push("O check-out deve estar no formato 'YYYY-MM-DD' ou 'HH:MM'.");
  } else if (isData(checkout)) {
    const dataCheckout = new Date(checkout);
    if (dataCheckout < hoje) {
      erros.push("A data de check-out deve ser hoje ou no futuro.");
    }
    if (dataCheckout > limiteMaximo) {
      erros.push("A data de check-out não pode ser mais de 10 anos no futuro.");
    }
  }

  // Valida ordem cronológica apenas se ambos forem datas
  if (isData(checkin) && isData(checkout)) {
    const dataCheckin = new Date(checkin);
    const dataCheckout = new Date(checkout);
    if (dataCheckout <= dataCheckin) {
      erros.push("A data de check-out deve ser depois da data de check-in.");
    }
  }

  return erros;
}