import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
   { label: "About", path: "/about" },
    { label: "Projects", path: "/Projects" },
  { label: "Contact", path: "/contact" },
 
 
  // { label: "Blog", path: "/blog" },
];
// const navLinks = [
//   { label: "Home", path: "/" },
//   { label: "Listing", path: "/listing" },
//   { label: "Contact", path: "/contact" },
//   { label: "Agents", path: "/agents" },
//   { label: "About", path: "/about" },
//   { label: "Blog", path: "/blog" },
// ];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // 50px scroll হলে bg change
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const baseLinkClass = "text-sm transition-colors px-1";
  const inactiveClass = "text-slate-700 hover:text-blue-700";
  const activeClass = "text-blue-700 font-semibold";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${
          isHome
            ? scrolled
              ? "bg-white shadow-sm"
              : "bg-transparent"
            : "bg-white shadow-sm"
        }
      `}
    >
      <nav className="max-w-6xl mx-auto px-4 lg:px-0 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md flex items-center justify-center">
            {/* <img
              src="/logo.png"
              alt="logo"
              className="h-full w-full object-contain"
            /> */}
          </div>
          {/* <span className="text-xl font-semibold text-[#254b86]">
            Real<span>Pro</span>
          </span> */}
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `${baseLinkClass} ${
                  isActive ? activeClass : inactiveClass
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          {/* <button className="text-sm text-slate-700 hover:text-blue-700">
            Sign Up
          </button> */}

         <button className="group flex items-center gap-3 bg-white text-gray-900 
                   text-sm font-medium px-5 py-2 rounded-sm
                   shadow-md hover:shadow-lg transition-all duration-300">
  
  {/* Icon box */}
  <span className="flex items-center justify-center w-8 h-8 
                    bg-[#5fa8fc] text-white
                   group-hover:bg-blue-700 transition">
    ↗
  </span>

  {/* Text */}
  <span>Create A Listing</span>
</button>

        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-slate-100"
          onClick={() => setOpen((prev) => !prev)}
        >
          <div className="space-y-1">
            <span className="block h-0.5 w-5 bg-slate-800" />
            <span className="block h-0.5 w-5 bg-slate-800" />
            <span className="block h-0.5 w-5 bg-slate-800" />
          </div>
        </button>
      </nav>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-white border-t shadow">
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `${baseLinkClass} ${
                    isActive ? activeClass : inactiveClass
                  } block`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
