import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../pages/Footer";


export default function PublicLayout() {
  return (
    <div className="App font-heading">
      <div className="min-h-screen bg-slate-50">
        <Navbar />

        {/* Navbar fixed হলে top padding দরকার */}
        <main className="pt-16">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}
