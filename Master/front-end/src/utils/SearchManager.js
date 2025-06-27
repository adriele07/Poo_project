export class SearchManager {
  constructor() {
    this.search = "";
    this.history = [];
  }

  get termo() {
    return this.search;
  }

  set termo(novoTermo) {
    this.search = novoTermo.trimStart(); // remove espaços no início
    if (this.search && !this.history.includes(this.search)) {
      this.history.push(this.search);
    }
  }

  limpar() {
    this.search = "";
  }

  getHistorico() {
    return [...this.history];
  }
}