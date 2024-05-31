export const URL = `https://burgery-api.onrender.com`;

export const Rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};
