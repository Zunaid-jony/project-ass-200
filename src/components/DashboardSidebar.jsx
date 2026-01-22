import { NavLink, useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiUsers,
  FiTag,
  FiChevronRight,
  FiLogOut,
  FiPlus,
} from "react-icons/fi";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/auth";
import { useAuth } from "../context/AuthContext";
import imgs from "../imges/logo.png";

const BRAND = "#1089bc";

const links = [
  { label: "Dashboard", path: "/", icon: FiGrid },
  { label: "Services", path: "/services", icon: FiTag },
  { label: "Projects", path: "/projects", icon: FiPlus },

  { label: "Team", path: "/team", icon: FiUsers },
];

export default function DashboardSidebar({ onNavigate }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const displayName = user?.displayName || "";

  const getInitials = (name) => {
    const parts = (name || "").trim().split(" ").filter(Boolean);
    if (!parts.length) return "BS";
    const first = parts[0][0] || "B";
    const last = parts.length > 1 ? parts.at(-1)[0] || "S" : "S";
    return (first + last).toUpperCase();
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login", { replace: true });
    } catch (e) {
      console.log(e);
      alert("Logout failed!");
    }
  };

  return (
    <aside className="h-screen w-72 bg-white border-r flex flex-col">
      {/* ================= Header ================= */}
      <div className="sticky top-0 z-10 bg-[#1089bc]">
        <div className="h-16 px-4 flex items-center gap-4">
          {/* Logo */}
          <div className="relative h-11 w-11 flex items-center justify-center ml-10">
            <img
              src={imgs}
              alt="My Project"
              className="absolute h-16 w-auto max-w-none object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.parentElement.innerHTML = `
                  <span style="font-weight:900;font-size:14px;color:white">
                    ${getInitials(displayName)}
                  </span>`;
              }}
            />
          </div>

          {/* Brand text */}
          <div className="leading-tight">
           
          </div>
        </div>
      </div>

      {/* ================= Menu (Scrollable) ================= */}
      <div className="flex-1 overflow-y-auto">
        <nav className="p-3">
          <p className="px-3 pb-2 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Menu
          </p>

          <div className="flex flex-col gap-1">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === "/"}
                  onClick={() => onNavigate?.()}
                  className={({ isActive }) =>
                    `group relative flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm transition
                    ${
                      isActive
                        ? "bg-slate-50 text-slate-900 font-semibold"
                        : "text-slate-700 hover:bg-slate-50"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* Active indicator */}
                      <span
                        className="absolute left-1 top-1/2 -translate-y-1/2 h-8 w-1.5 rounded-full"
                        style={{
                          backgroundColor: isActive ? BRAND : "transparent",
                        }}
                      />

                      {/* Icon */}
                      <span
                        className="h-10 w-10 rounded-2xl flex items-center justify-center transition border"
                        style={{
                          backgroundColor: isActive
                            ? BRAND
                            : "rgba(15, 23, 42, 0.04)",
                          color: isActive ? "white" : "#334155",
                          borderColor: isActive
                            ? "transparent"
                            : "rgba(15, 23, 42, 0.06)",
                        }}
                      >
                        <Icon className="text-[18px]" />
                      </span>

                      <span className="flex-1">{link.label}</span>

                      <FiChevronRight
                        className="text-base transition"
                        style={{
                          color: isActive ? BRAND : "#94a3b8",
                        }}
                      />
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </nav>
      </div>

      {/* ================= Footer (Fixed Bottom) ================= */}
      <div className="sticky bottom-0 bg-white border-t p-3">
        <button
          onClick={handleLogout}
          className="w-full h-11 rounded-2xl flex items-center justify-center gap-2 font-bold transition hover:bg-slate-50 text-slate-800"
        >
          <FiLogOut className="text-[18px]" />
          Logout
        </button>
      </div>
    </aside>
  );
}
