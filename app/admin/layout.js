import AdminLayoutClient from "./components/AdminLayoutClient";

export const metadata = {
  title: "Admin Panel | A2Z Solar Solutions",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
