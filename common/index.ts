export const renderRupiah = (value: number) =>
  value !== null
    ? `Rp. ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`
    : "Rp. 0";
