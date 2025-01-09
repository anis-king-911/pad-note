import { Baloo_Bhaijaan_2 } from "next/font/google";
import "@/styles/globals.css";

const baloo_bhaijaan_2 = Baloo_Bhaijaan_2({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
});

export const metadata = {
  title: "Modern Note",
  description: "Modern Note",
};

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${baloo_bhaijaan_2.className} bg-gray-200 p-1`}
      >
        {children}
      </body>
    </html>
  );
}

export default RootLayout;