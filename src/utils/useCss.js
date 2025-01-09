import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

function useCss(...inputs) {
  return twMerge(clsx(inputs))
}

export default useCss;