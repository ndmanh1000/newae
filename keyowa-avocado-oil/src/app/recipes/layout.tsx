import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "50+ Công Thức Món Ăn Bếp Sao Chuẩn Vị | Dầu Bơ Ép Lạnh KEYAVO",
  description:
    "Bộ sưu tập 50+ công thức ẩm thực chuẩn sao Michelin cùng dầu bơ ép lạnh Keyavo: Steak áp chảo nhiệt cao 270°C, cá hồi da giòn, mì Ý sốt nhũ hóa và thực đơn ăn dặm giàu Omega-9 & DHA cho bé.",
  keywords: [
    "công thức nấu ăn",
    "công thức dầu bơ",
    "món ăn eat clean",
    "áp chảo 270 độ",
    "cá hồi áp chảo",
    "steak áp chảo",
    "ăn dặm cho bé",
    "sốt vinaigrette",
  ],
  alternates: {
    canonical: "/recipes",
  },
  openGraph: {
    title: "50+ Công Thức Món Ăn Bếp Sao Chuẩn Vị | Dầu Bơ Ép Lạnh KEYAVO",
    description:
      "Tuyệt phẩm ẩm thực cùng dầu bơ ép lạnh nguyên chất Keyavo: Điểm khói 270°C không khét cháy, chuẩn vị bếp sao.",
    url: "/recipes",
    images: [
      {
        url: "/images/recipe-salmon.webp",
        width: 1200,
        height: 800,
        alt: "Cá hồi áp chảo da giòn với dầu bơ Keyavo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "50+ Công Thức Món Ăn Bếp Sao Chuẩn Vị | Dầu Bơ Ép Lạnh KEYAVO",
    description: "Bộ sưu tập 50+ công thức ẩm thực chuẩn sao Michelin cùng dầu bơ ép lạnh Keyavo.",
    images: ["/images/recipe-salmon.webp"],
  },
};

const recipeJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Recipe",
        "name": "Salad Ức Gà Áp Chảo & Sốt Vinaigrette Dầu Bơ Chanh Leo",
        "image": "https://keyavo.vn/images/recipe-salad.webp",
        "description": "Thịt ức gà mềm mọng nước khi áp chảo ở 220°C cùng sốt chanh leo sánh mịn óng ánh dầu bơ Keyavo.",
        "cookTime": "PT10M",
        "prepTime": "PT10M",
        "totalTime": "PT20M",
        "recipeYield": "2 phần ăn",
        "nutrition": {
          "@type": "NutritionInformation",
          "calories": "380 calories"
        },
        "author": {
          "@type": "Organization",
          "name": "KEYAVO Culinary Team"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "Recipe",
        "name": "Cá Hồi Na-uy Áp Chảo Da Giòn Rụm & Sốt Bơ Thì Là",
        "image": "https://keyavo.vn/images/recipe-salmon.webp",
        "description": "Tuyệt phẩm cá hồi áp chảo ở nhiệt độ cao 240°C với lớp da giòn tan hoàn hảo.",
        "cookTime": "PT8M",
        "prepTime": "PT10M",
        "totalTime": "PT18M",
        "recipeYield": "2 phần ăn",
        "nutrition": {
          "@type": "NutritionInformation",
          "calories": "460 calories"
        },
        "author": {
          "@type": "Organization",
          "name": "KEYAVO Culinary Team"
        }
      }
    }
  ]
};

export default function RecipesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeJsonLd) }}
      />
      {children}
    </>
  );
}
