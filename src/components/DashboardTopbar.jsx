import React, { useEffect, useRef, useState } from "react";
import {
  FiBell,
  FiChevronDown,
  FiLogOut,
  FiSettings,
  FiUser,
  FiSearch,
  FiArrowLeft,
} from "react-icons/fi";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const BRAND = "#1089bc";
const ACCENT = "#f6c343"; // yellow-ish like screenshot

export default function DashboardTopbar({
  onMenuClick,
  title = "Dashboard",
  notifCount = 27,
}) {
  const navigate = useNavigate();
  const { user, checking } = useAuth();

  const [openProfile, setOpenProfile] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);
  const menuRef = useRef(null);
  const notifRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpenProfile(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setOpenNotif(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpenProfile(false);
        setOpenNotif(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!checking && !user) navigate("/login", { replace: true });
  }, [checking, user, navigate]);

  const displayName = user?.displayName || "User";
  const email = user?.email || "";
  const photoURL = user?.photoURL || "";

  const getInitials = (name) => {
    const parts = (name || "").trim().split(" ").filter(Boolean);
    if (!parts.length) return "U";
    const first = parts[0][0] || "U";
    const last = parts.length > 1 ? (parts[parts.length - 1][0] || "") : "";
    return (first + last).toUpperCase();
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setOpenProfile(false);
      navigate("/login", { replace: true });
    } catch (err) {
      console.log("Logout Error:", err);
      alert("Logout failed!");
    }
  };

  return (
    <>
      {/* Top Blue Bar */}
      <header
        className="h-16 flex items-center justify-between px-4 sm:px-6 shadow"
        style={{ backgroundColor: BRAND }}
      >
        {/* Left */}
        <div className="flex items-center gap-3 min-w-[220px]">
          {/* Yellow circle button (like screenshot) */}
          <button
            type="button"
            onClick={onMenuClick}
            className="inline-flex items-center justify-center h-9 w-9 rounded-full transition hover:opacity-90"
            style={{ backgroundColor: ACCENT }}
            aria-label="Open menu"
            title="Menu"
          >
            <FiArrowLeft className="text-slate-900 text-lg" />
          </button>

          <div className="leading-tight text-white">
            <h1 className="text-base sm:text-lg font-extrabold tracking-wide">
              {title}
            </h1>
            {/* <p className="hidden sm:block text-xs opacity-90">
              Welcome back, <span className="font-semibold">{displayName}</span>
            </p> */}
          </div>
        </div>

        {/* Middle search (optional like your old one, but subtle) */}
        {/* <div className="hidden lg:flex w-full max-w-xl px-6">
          <div className="w-full h-10 rounded-full bg-white/15 border border-white/20 flex items-center gap-2 px-3">
            <FiSearch className="text-white/80" />
            <input
              className="bg-transparent outline-none w-full text-sm text-white placeholder:text-white/70"
              placeholder="Search..."
            />
            <span className="ml-2 text-[10px] text-white/80 bg-white/15 px-2 py-1 rounded-full">
              Ctrl K
            </span>
          </div>
        </div> */}

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setOpenNotif((p) => !p)}
              className="relative h-10 w-10 rounded-full flex items-center justify-center transition hover:bg-white/10"
              title="Notifications"
              aria-label="Notifications"
            >
              <FiBell className="text-xl text-white" />

              {/* red count badge */}
              {notifCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-extrabold flex items-center justify-center">
                  {notifCount > 99 ? "99+" : notifCount}
                </span>
              )}
            </button>

            {openNotif && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-lg overflow-hidden z-50">
                <div className="px-4 py-3 border-b bg-slate-50 flex items-center justify-between">
                  <p className="text-sm font-extrabold text-slate-900">Notifications</p>
                  <button className="text-xs font-semibold hover:underline" style={{ color: BRAND }}>
                    Mark all read
                  </button>
                </div>

                <div className="p-2">
                  <NotifItem title="New order received" desc="Order #1029 placed just now." />
                  <NotifItem title="Low stock alert" desc="Baby wipes stock is running low." />
                  <NotifItem title="Payment completed" desc="Order #1021 payment confirmed." />
                </div>

                <div className="p-3 border-t bg-white">
                  <button
                    type="button"
                    onClick={() => {
                      setOpenNotif(false);
                      navigate("/notifications");
                    }}
                    className="w-full h-10 rounded-xl text-sm font-bold border border-slate-200 hover:bg-slate-50 transition"
                    style={{ color: BRAND }}
                  >
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Logout pill button (like screenshot) */}
          <button
            onClick={handleLogout}
            className="hidden sm:flex items-center gap-2 h-10 px-5 rounded-full font-extrabold text-white transition hover:opacity-95"
            style={{ border: `2px solid ${ACCENT}` }}
            title="Logout"
          >
            <FiLogOut className="text-mg" />
            Logout
          </button>

          {/* Profile dropdown */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setOpenProfile((p) => !p)}
              className="h-10 rounded-full px-2 sm:px-3 transition hover:bg-white/10 flex items-center gap-2"
              aria-label="Profile menu"
            >
              {photoURL ? (
                <img
                  src={photoURL}
                  alt="avatar"
                  className="h-9 w-9 rounded-full object-cover border border-white/30"
                />
              ) : (
                <div
                  className="h-9 w-9 rounded-full text-white flex items-center justify-center font-extrabold text-sm"
                  style={{ backgroundColor: "rgba(255,255,255,.18)" }}
                >
                  {getInitials(displayName)}
                </div>
              )}

              <div className="hidden sm:block text-left leading-tight">
                <p className="text-sm font-extrabold text-white">{displayName}</p>
                <p className="text-xs text-white/80">Admin</p>
              </div>

              <FiChevronDown className="text-white/80 hidden sm:block" />
            </button>

            {openProfile && (
              <div className="absolute right-0 mt-2 w-72 bg-white border border-slate-200 rounded-2xl shadow-lg overflow-hidden z-50">
                <div className="p-4 border-b bg-slate-50">
                  <p className="text-sm font-extrabold text-slate-900">{displayName}</p>
                  <p className="text-xs text-slate-600 truncate">{email}</p>
                </div>

                <div className="p-2">
                  <MenuBtn
                    icon={<FiUser className="text-base" />}
                    label="My Profile"
                    onClick={() => {
                      setOpenProfile(false);
                      navigate("/profile");
                    }}
                    accent={BRAND}
                  />
                  <MenuBtn
                    icon={<FiSettings className="text-base" />}
                    label="Settings"
                    onClick={() => {
                      setOpenProfile(false);
                      navigate("/settings");
                    }}
                    accent={BRAND}
                  />

                  <div className="my-2 border-t border-slate-200" />

                  <button
                    className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-rose-50 text-sm font-semibold text-rose-600 transition"
                    onClick={handleLogout}
                    type="button"
                  >
                    <FiLogOut className="text-base" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Breadcrumb strip (like screenshot “Dashboard” line) */}
      <div className="h-10 bg-white border-b flex items-center px-4 sm:px-6 text-sm text-slate-600">
        <span className="font-semibold text-slate-700">Dashboard</span>
      </div>
    </>
  );
}

function MenuBtn({ icon, label, onClick, accent }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-slate-100 text-sm text-slate-700 transition"
    >
      <span
        className="h-8 w-8 rounded-xl flex items-center justify-center border"
        style={{
          backgroundColor: "rgba(16,137,188,.10)",
          borderColor: "rgba(16,137,188,.18)",
          color: accent,
        }}
      >
        {icon}
      </span>
      <span className="font-semibold">{label}</span>
    </button>
  );
}

function NotifItem({ title, desc }) {
  return (
    <div className="px-3 py-2 rounded-xl hover:bg-slate-50 transition cursor-pointer">
      <p className="text-sm font-semibold text-slate-900">{title}</p>
      <p className="text-xs text-slate-600">{desc}</p>
    </div>
  );
}
