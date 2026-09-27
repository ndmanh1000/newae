import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Điều Khoản Dịch Vụ & Mua Hàng Trực Tuyến | KEYOWA",
  description:
    "Các điều khoản dịch vụ, quy định giao hàng, thanh toán và hướng dẫn mua sắm dầu bơ ép lạnh chính hãng tại KEYOWA.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Điều Khoản Dịch Vụ & Mua Hàng Trực Tuyến | KEYOWA",
    description: "Quy định đặt hàng, thanh toán và giao nhận sản phẩm dầu bơ ép lạnh KEYOWA toàn quốc.",
    url: "/terms",
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
