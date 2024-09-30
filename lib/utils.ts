import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (value: string) => {
  const numberValue = parseFloat(value.replace(/[^0-9.-]+/g, ""));
  if (isNaN(numberValue)) {
    return "Kes. 0.00";
  }
  return `Kes. ${numberValue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
};
