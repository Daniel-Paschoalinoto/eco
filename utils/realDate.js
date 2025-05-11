class RealDate {
  get day() { return new Date().getDate(); }
  get month() { return new Date().getMonth() + 1; }
  get year() { return new Date().getFullYear(); }
  get hour() { return new Date().getHours(); }
  get minute() { return new Date().getMinutes(); }
}

// Exporta uma instância para uso direto: realDate.year
export default new RealDate();
