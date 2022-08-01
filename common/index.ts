export const renderRupiah = (value: number, withRp?: boolean) => {
  if (!withRp) return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return value !== null
    ? `Rp. ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`
    : "Rp. 0";
};
