import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { useState } from "react";

const teamMembers = [
  {
    id: 1,
    name: "MUSTUQUE MUNIM",
    role: "DIRECTOR",
    image: "/imges/Overlay.png",
    bio:"With over 20 years in real estate, James leads Nuvanta with a clear vision to gett develop lasting communities."
  },
  {
    id: 2,
    name: "md salah uddin",
    role: "CHAIRMAN & CEO",
    image: "/imges/Overlay_2.png",
        bio:"With over 20 years in real estate, James leads Nuvanta with a clear vision to gett develop lasting communities."

  },
  {
    id: 3,
    name: "INTAN JURA",
    role: "Head Architect",
    image: "/imges/Overlay_3.png",
        bio:"With over 20 years in real estate, James leads Nuvanta with a clear vision to gett develop lasting communities."

  },
  {
    id: 4,
    name: "mahmuda khadiza",
    role: "MANAGING DIRECTOR",
    image: "/imges/Overlay_4.png",
    
    bio:"With over 20 years in real estate, James leads Nuvanta with a clear vision to gett develop lasting communities."

  },
];

export default function TeamSection() {
  // ⭐ Default active = second card (index 1)
  const DEFAULT_ACTIVE = 1;
  const [activeCard, setActiveCard] = useState(DEFAULT_ACTIVE);

  return (
    <section className="w-full bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] text-gray-500 uppercase mb-2">
            Our Team
          </p>
          <h2 className="text-2xl md:text-4xl leading-tight tracking-[0.05em] text-[#111827] font-light">
            DEDICATED EXPERTS BEHIND EVERY <br /> SUCCESSFUL DEVELOPMENT
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-4">
  {teamMembers.map((member, index) => (
    <div
      key={member.id}
      className="flex flex-col items-center cursor-pointer group"
      onMouseEnter={() => setActiveCard(index)}
      onMouseLeave={() => setActiveCard(DEFAULT_ACTIVE)}
    >
      {/* Card */}
      <div className="relative w-full h-[260px] rounded-xl overflow-hidden">
        {/* Image */}
        <img
          src={member.image}
          alt={member.name}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-500
            ${activeCard === index ? "scale-105 brightness-90" : "scale-100 brightness-100"}
          `}
        />

        {/* Soft gradient overlay */}
        <div
          className={`absolute inset-0 transition-all duration-300
            ${
              activeCard === index
                ? "bg-gradient-to-t from-[#252b35]/70 via-[#252b35]/40 to-transparent opacity-100"
                : "opacity-0"
            }
          `}
        />

        {/* Social + Text */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center gap-4 transition-all duration-500
            ${
              activeCard === index
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            }
          `}
        >
          <div className="flex gap-3">
            <SocialIcon><FaFacebookF /></SocialIcon>
            <SocialIcon><FaInstagram /></SocialIcon>
            <SocialIcon><FaTwitter /></SocialIcon>
            <SocialIcon><FaLinkedinIn /></SocialIcon>
          </div>

          <p className="w-[80%] text-xs text-gray-200 leading-relaxed text-center">
          {member.bio}
          </p>
        </div>
      </div>

      {/* Name */}
      <div className="mt-4 text-center">
        <p className="text-xs md:text-sm tracking-[0.18em] uppercase text-[#111827]">
          {member.name}
        </p>
        <p className="mt-1 text-xs md:text-sm text-gray-500">
          {member.role}
        </p>
      </div>
    </div>
  ))}
</div>

      </div>
    </section>
  );
}

// 🔹 Reusable social icon Box
function SocialIcon({ children }) {
  return (
    <span className="w-8 h-8 rounded-full bg-[#323845] flex items-center justify-center text-xs text-white hover:bg-[#4c7dff] transition">
      {children}
    </span>
  );
}
