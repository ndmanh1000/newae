import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KEYOWA | Dầu Bơ Ép Lạnh Nguyên Chất Điểm Khói 270°C",
  description:
    "Dầu bơ nguyên chất 100% bơ Hass Đắk Lắk ép lạnh dưới 40°C. Điểm khói kỷ lục 270°C an toàn tuyệt đối cho chiên xào nhiệt độ cao & chuẩn vị bếp sao.",
  keywords: [
    "dầu bơ",
    "dầu bơ ép lạnh",
    "keyowa",
    "dầu ăn điểm khói cao",
    "dầu bơ đắk lắk",
    "dầu ăn dặm cho bé",
    "dầu dưỡng da tự nhiên",
  ],
  openGraph: {
    title: "KEYOWA - Giọt Vàng Thượng Hạng Cho Ẩm Thực Nhiệt Độ Cao",
    description:
      "100% Bơ Hass Đắk Lắk tuyển chọn, ép lạnh cơ học dưới 40°C. Điểm khói 270°C vượt trội bảo vệ sức khỏe gia đình.",
    images: ["/images/hero-bottle.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${sans.variable} ${serif.variable}`}>
      <body className="min-h-screen bg-[#FAF8F5] text-[#1B2921] font-sans antialiased selection:bg-forest-700 selection:text-white">
        <LanguageProvider>
          <CartProvider>{children}</CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
