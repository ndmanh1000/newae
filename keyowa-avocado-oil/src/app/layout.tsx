import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";
import CustomerSupportChat from "@/components/CustomerSupportChat";
import LiveSalesNotification from "@/components/LiveSalesNotification";

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

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://keyavo.vn";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "KEYAVO | Dầu Bơ Ép Lạnh Nguyên Chất Điểm Khói 270°C",
    template: "%s | KEYAVO Avocado Oil",
  },
  description:
    "Dầu bơ nguyên chất 100% bơ Hass Đắk Lắk ép lạnh dưới 40°C. Điểm khói kỷ lục 270°C an toàn tuyệt đối cho chiên xào nhiệt độ cao & chuẩn vị bếp sao. Giàu Omega-9 và vitamin E tự nhiên.",
  keywords: [
    "dầu bơ",
    "dầu bơ ép lạnh",
    "keyavo",
    "dầu ăn điểm khói cao",
    "dầu bơ 270 độ",
    "dầu bơ đắk lắk",
    "dầu ăn dặm cho bé",
    "dầu chiên xào không khói",
    "dầu ăn eat clean",
    "dầu ăn keto",
  ],
  authors: [{ name: "KEYAVO Vietnam" }],
  creator: "KEYAVO",
  publisher: "KEYAVO Vietnam",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "KEYAVO - Giọt Vàng Thượng Hạng Cho Ẩm Thực Nhiệt Độ Cao",
    description:
      "100% Bơ Hass Đắk Lắk tuyển chọn, ép lạnh cơ học dưới 40°C. Điểm khói 270°C vượt trội bảo vệ sức khỏe gia đình.",
    url: baseUrl,
    siteName: "KEYAVO Avocado Oil",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "/images/hero-bottle.webp",
        width: 1200,
        height: 630,
        alt: "Chai Dầu Bơ Ép Lạnh Nguyên Chất KEYAVO",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KEYAVO | Dầu Bơ Ép Lạnh Nguyên Chất Điểm Khói 270°C",
    description:
      "100% Bơ Hass Đắk Lắk ép lạnh dưới 40°C. Điểm khói kỷ lục 270°C bảo vệ sức khỏe gia đình.",
    images: ["/images/hero-bottle.webp"],
    creator: "@keyavo_vn",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: "KEYAVO",
      url: baseUrl,
      logo: `${baseUrl}/images/hero-bottle.webp`,
      description:
        "Thương hiệu dầu bơ ép lạnh nguyên chất 100% bơ Hass Đắk Lắk với điểm khói 270°C chuẩn ẩm thực 5 sao.",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+84-90-123-4567",
        contactType: "customer service",
        areaServed: "VN",
        availableLanguage: ["Vietnamese", "English"],
      },
      sameAs: [
        "https://facebook.com/keyavo.vietnam",
        "https://instagram.com/keyavo.oil",
        "https://tiktok.com/@keyavoofficial",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      url: baseUrl,
      name: "KEYAVO | Dầu Bơ Ép Lạnh Nguyên Chất",
      publisher: {
        "@id": `${baseUrl}/#organization`,
      },
      potentialAction: {
        "@type": "SearchAction",
        target: `${baseUrl}/recipes?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${sans.variable} ${serif.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#FAF8F5] text-[#1B2921] font-sans antialiased selection:bg-forest-700 selection:text-white">
        <LanguageProvider>
          <CartProvider>
            {children}
            <LiveSalesNotification />
            <CustomerSupportChat />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
