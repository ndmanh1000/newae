import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cam Kết Chất Lượng Vàng & Chính Sách Đổi Trả 14 Ngày | KEYOWA",
  description:
    "Tìm hiểu 5 tiêu chuẩn vàng của dầu bơ Keyowa: 100% bơ Hass Đắk Lắk tuyển chọn, ép lạnh dưới 40°C, điểm khói 270°C và chính sách đổi trả miễn phí trong 14 ngày.",
  alternates: {
    canonical: "/guarantee",
  },
  openGraph: {
    title: "Cam Kết Chất Lượng Vàng & Đổi Trả Miễn Phí 14 Ngày | KEYOWA",
    description:
      "Cam kết hoàn tiền 200% nếu phát hiện pha tạp. Đạt chuẩn an toàn thực phẩm quốc tế ISO 22000, HACCP & kiểm nghiệm Eurofins.",
    url: "/guarantee",
    images: ["/images/hero-bottle.webp"],
  },
};

export default function GuaranteeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
