// src/components/Footer.jsx
import React from "react";
import { FiArrowUpRight, FiArrowUp, FiPhoneCall, FiMail } from "react-icons/fi";

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="w-full bg-[#282d33] text-white pt-14 md:pt-16 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* TOP: CTA + CONTACT */}
        <div className="flex flex-col lg:flex-row justify-between gap-10 border-b border-white/10 pb-10">
          {/* Left */}
          <div className="text-left">
            <p className="text-[10px] sm:text-xs tracking-[0.28em] text-gray-400 uppercase mb-2">
              Take Action
            </p>

            <h2 className="font-heading uppercase tracking-[0.08em] leading-snug text-[22px] md:text-[28px] font-light">
              START YOUR HOME <br />
              OWNERSHIP JOURNEY <br />
              WITH BANGLA BOSOTI
            </h2>

            {/* CTA Button */}
            <div className="mt-6">
              <button className="group inline-flex items-stretch rounded-md overflow-hidden shadow-md">
                <span className="bg-[#020617] px-3 py-3 flex items-center justify-center">
                  <FiArrowUpRight className="text-white text-sm transition group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" />
                </span>
                <span className="bg-[#3b82f6] text-white text-[11px] md:text-[12px] tracking-[0.18em] font-medium px-4 py-3 uppercase transition group-hover:bg-[#2563eb]">
                  Get Free Consultation
                </span>
              </button>
            </div>
          </div>

          {/* Right (Contact blocks like screenshot) */}
          <div className="flex flex-col gap-6 sm:gap-7">
            {/* Call */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1e293b] flex items-center justify-center shrink-0">
                <FiPhoneCall className="text-[#3b82f6]" />
              </div>

              <div className="min-w-0">
                <p className="text-[10px] tracking-[0.18em] uppercase text-gray-400">
                  Call Us
                </p>
                <a
                  href="tel:+8801770363002"
                  className="block text-sm mt-1 text-gray-200 hover:text-white transition"
                >
                  +8801770363002
                </a>
              </div>
            </div>

            {/* Mail */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1e293b] flex items-center justify-center shrink-0">
                <FiMail className="text-[#3b82f6]" />
              </div>

              <div className="min-w-0">
                <p className="text-[10px] tracking-[0.18em] uppercase text-gray-400">
                  Mail Us
                </p>
                <a
                  href="mailto:taniaakter@banglabosoti.com"
                  className="block text-sm mt-1 text-gray-200 hover:text-white transition break-all"
                >
                  TANIAAKTER@BANGLABOSOTI.COM
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* LINK COLUMNS */}
        <div className="py-10 grid gap-8 sm:grid-cols-2 md:grid-cols-5 text-xs md:text-sm text-gray-300">
          {/* Company */}
          <div className="text-left">
            <h4 className="text-[11px] tracking-[0.18em] uppercase text-gray-400 mb-4">
              Company
            </h4>
            <ul className="space-y-2">
              <li>About Us</li>
              <li className="flex items-center gap-2">
                Career
                <span className="text-[10px] px-2 py-[2px] rounded-full bg-emerald-400/10 text-emerald-300">
                  Hiring
                </span>
              </li>
              <li>Our Approach</li>
              <li>Case Studies</li>
            </ul>
          </div>

          {/* Services */}
          <div className="text-left">
            <h4 className="text-[11px] tracking-[0.18em] uppercase text-gray-400 mb-4">
              Services
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                Property Development
                <span className="text-[10px] px-2 py-[2px] rounded-full bg-blue-400/15 text-blue-200">
                  New
                </span>
              </li>
              <li>Design &amp; Planning</li>
              <li>Investment Advisor</li>
              <li>Villa Development</li>
            </ul>
          </div>

          {/* Resources */}
          <div className="text-left">
            <h4 className="text-[11px] tracking-[0.18em] uppercase text-gray-400 mb-4">
              Resources
            </h4>
            <ul className="space-y-2">
              <li>Blog / Articles</li>
              <li>Detail Guides</li>
              <li>FAQs</li>
              <li>Help Center</li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="text-left">
            <h4 className="text-[11px] tracking-[0.18em] uppercase text-gray-400 mb-4">
              Social Media
            </h4>
            <ul className="space-y-2">
              <li>Instagram</li>
              <li>Twitter</li>
              <li>Tiktok</li>
              <li>Facebook</li>
              <li>LinkedIn</li>
              <li>Youtube</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-left">
            <h4 className="text-[11px] tracking-[0.18em] uppercase text-gray-400 mb-4">
              Contact
            </h4>
            <ul className="space-y-2">
              <li className="break-all">TANIAAKTER@BANGLABOSOTI.COM</li>
              <li>Ambassador Dhaka</li>
              <li>+8801770363002</li>
            </ul>
          </div>
        </div>

        {/* BOTTOM ROW */}
        <div className="border-t border-white/10 py-4 flex items-center justify-between text-[11px] text-gray-400">
          <p>© 2025 All Right Reserved by Tezz Digital</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 border border-white/20 rounded-full text-[11px] uppercase tracking-[0.18em] hover:bg-white hover:text-black transition"
          >
            <FiArrowUp className="text-xs" />
            Back to Top
          </button>
        </div>
      </div>

      {/* ===== BIG NAME AREA (band + text) ===== */}
      <div className="mt-6">
        {/* make this section relative so absolute text stays inside this band */}
        <div className="relative w-full">
          {/* grey band */}
          <div className="h-28 md:h-32 w-full bg-gradient-to-b from-[#2f343a] to-[#8a8a8a]" />

          {/* big text over band (INSIDE band only) */}
          <div className="absolute left-0 right-0 bottom-0 pointer-events-none">
            <div className="max-w-6xl mx-auto px-6 pb-6 md:pb-8">
              <p
                className="font-heading uppercase font-bold tracking-[0.18em]
                text-[52px] sm:text-[70px] md:text-[92px] leading-none
                bg-gradient-to-b from-[#ffffffd9] via-[#d4d4d4] to-[#8e8e8e]
                bg-clip-text text-transparent select-none"
              >
                TANIA AKTER
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
