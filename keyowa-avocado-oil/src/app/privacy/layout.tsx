import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chính Sách Bảo Mật Thông Tin Khách Hàng | KEYOWA",
  description:
    "Chính sách bảo mật thông tin cá nhân và dữ liệu thanh toán của khách hàng tại KEYOWA theo quy định pháp luật Việt Nam.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Chính Sách Bảo Mật Thông Tin Khách Hàng | KEYOWA",
    description: "Bảo vệ thông tin cá nhân và quyền riêng tư tuyệt đối cho khách hàng khi mua sắm tại KEYOWA.",
    url: "/privacy",
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
