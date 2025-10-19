import { Outlet } from "react-router-dom";
import Header from "@/components/Header.tsx";
import Footer from "@/components/Footer.tsx";
export default function RootLayout() {
  return (
    <>
      <div className="flex min-h-screen flex-col overflow-hidden">
        <Header />
        <main className="mt-16 flex-1">
          <Outlet />
        </main>
      </div>
    </>
  );
}
