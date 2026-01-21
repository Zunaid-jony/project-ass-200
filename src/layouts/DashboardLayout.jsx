import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardTopbar from "../components/DashboardTopbar";

const SIDEBAR_W = 288; // 72 * 4 = 288px (w-72). আপনি চাইলে 256 করতে পারেন

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);   // ✅ desktop+mobile shared state
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // detect mobile (md breakpoint ~768px)
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // route change হলে mobile sidebar auto close
  useEffect(() => {
    if (isMobile) setSidebarOpen(false);
  }, [location.pathname, isMobile]);

  // ESC press করলে close (mobile এ দরকার)
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape" && isMobile) setSidebarOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMobile]);

  const toggleSidebar = () => setSidebarOpen((p) => !p);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* ✅ Desktop Sidebar */}
      <div
        className={`hidden md:block fixed left-0 top-0 h-screen bg-white border-r transition-all duration-300`}
        style={{ width: sidebarOpen ? SIDEBAR_W : 0, overflow: "hidden" }}
      >
        <div style={{ width: SIDEBAR_W }}>
          <DashboardSidebar />
        </div>
      </div>

      {/* ✅ Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ✅ Mobile Sidebar Drawer */}
      {isMobile && (
        <div
          className={`fixed left-0 top-0 h-screen z-50 bg-white border-r transform transition-transform duration-300`}
          style={{
            width: SIDEBAR_W,
            transform: sidebarOpen ? "translateX(0)" : `translateX(-${SIDEBAR_W}px)`,
          }}
        >
          <DashboardSidebar onNavigate={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* ✅ Topbar (fixed) */}
      <div
        className="fixed top-0 right-0 left-0 z-30 transition-all duration-300"
        style={{
          marginLeft: !isMobile && sidebarOpen ? SIDEBAR_W : 0,
        }}
      >
        <DashboardTopbar onMenuClick={toggleSidebar} />
      </div>

      {/* ✅ Content */}
      <main
        className="pt-16 transition-all duration-300"
        style={{
          marginLeft: !isMobile && sidebarOpen ? SIDEBAR_W : 0,
        }}
      >
        <div className="p-4 sm:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
