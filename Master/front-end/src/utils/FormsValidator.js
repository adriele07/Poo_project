export class FormValidator {
  constructor({
    title,
    address,
    description,
    extras,
    photos = [],
    previewPhotos = [],
    checkin,
    checkout,
  }) {
    this.title = title;
    this.address = address;
    this.description = description;
    this.extras = extras;
    this.photos = photos;
    this.previewPhotos = previewPhotos;
    this.checkin = checkin;
    this.checkout = checkout;

    this.erros = [];
    this.hoje = new Date();
    this.hoje.setHours(0, 0, 0, 0);

    this.limiteMaximo = new Date();
    this.limiteMaximo.setFullYear(this.limiteMaximo.getFullYear() + 10);
  }

  validarTodos() {
    this.validarCamposObrigatorios();
    this.validarFotos();
    this.validarCheckin();
    this.validarCheckout();
    this.validarOrdemDatas();
    return this.erros;
  }

  isHora(str) {
    return /^\d{2}:\d{2}$/.test(str);
  }

  isData(str) {
    return /^\d{4}-\d{2}-\d{2}$/.test(str);
  }

  validarCamposObrigatorios() {
    if (typeof this.title === "string" && !this.title.trim()) {
      this.erros.push("O título é obrigatório.");
    }
    if (typeof this.address === "string" && !this.address.trim()) {
      this.erros.push("O endereço é obrigatório.");
    }
    if (typeof this.description === "string" && !this.description.trim()) {
      this.erros.push("A descrição é obrigatória.");
    }
    if (typeof this.extras === "string" && !this.extras.trim()) {
      this.erros.push("As informações extras são obrigatórias.");
    }
  }

  validarFotos() {
    const semFotosNovas = this.photos.length === 0;
    const semFotosPreview = this.previewPhotos.length === 0;

    if (semFotosNovas && semFotosPreview) {
      this.erros.push("Pelo menos uma foto deve ser enviada.");
    }

    const totalFotos = this.photos.length + this.previewPhotos.length;
    if (totalFotos > 5) {
      this.erros.push("Você pode enviar no máximo 5 fotos.");
    }
  }

  validarCheckin() {
    if (!this.checkin) {
      this.erros.push("O valor de check-in é obrigatório.");
    } else if (!this.isData(this.checkin) && !this.isHora(this.checkin)) {
      this.erros.push("O check-in deve estar no formato 'YYYY-MM-DD'.");
    } else if (this.isData(this.checkin)) {
      const dataCheckin = new Date(this.checkin);
      if (dataCheckin < this.hoje) {
        this.erros.push("A data de check-in deve ser hoje ou no futuro.");
      }
      if (dataCheckin > this.limiteMaximo) {
        this.erros.push(
          "A data de check-in não pode ser mais de 10 anos no futuro.",
        );
      }
    }
  }

  validarCheckout() {
    if (!this.checkout) {
      this.erros.push("O valor de check-out é obrigatório.");
    } else if (!this.isData(this.checkout) && !this.isHora(this.checkout)) {
      this.erros.push(
        "O check-out deve estar no formato 'YYYY-MM-DD' ou 'HH:MM'.",
      );
    } else if (this.isData(this.checkout)) {
      const dataCheckout = new Date(this.checkout);
      if (dataCheckout < this.hoje) {
        this.erros.push("A data de check-out deve ser hoje ou no futuro.");
      }
      if (dataCheckout > this.limiteMaximo) {
        this.erros.push(
          "A data de check-out não pode ser mais de 10 anos no futuro.",
        );
      }
    }
  }

  validarOrdemDatas() {
    if (this.isData(this.checkin) && this.isData(this.checkout)) {
      const dataCheckin = new Date(this.checkin);
      const dataCheckout = new Date(this.checkout);
      if (dataCheckout <= dataCheckin) {
        this.erros.push(
          "A data de check-out deve ser depois da data de check-in.",
        );
      }
    }
  }
}
