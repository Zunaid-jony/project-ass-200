import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaPlay, FaStar } from "react-icons/fa";

import { FiArrowUpRight } from "react-icons/fi";
import AboutSection from "./AboutSection";
import OurTeam from "./OurTeam";
import CommonQuestions from "./CommonQuestions";
import Services from "./Services";

export const Home = () => {
  const [index, setIndex] = useState(0);

  const testimonials = [
    {
      name: "Anwar Rahman",
      role: "Businessman",
      text: `“Buying a home with Bravora was the best decision we made. The location, design, and entire buying process exceeded our expectations. Their team was helpful, responsive, and very professional. We finally feel like we’ve found our forever home.”`,
    },
    {
      name: "MICHAEL LEE",
      role: "Product Manager",
      text: `“From the very first meeting, the team made everything simple and transparent. The quality of the finishings and attention to detail are outstanding.”`,
    },
    {
      name: "ANNA RIVERA",
      role: "Designer",
      text: `“Smooth process, great after-sales support, and a community we absolutely love. Highly recommended for anyone buying their first home.”`,
    },
  ];

  const total = testimonials.length;

  const handleNext = () => setIndex((prev) => (prev + 1) % total);
  const handlePrev = () => setIndex((prev) => (prev - 1 + total) % total);

  const current = testimonials[index];
  const projects = [
    {
      id: 1,
      locationTags: ["Jakarta", "Commercial"],
      title: "GARDEN HOME | RX-5 (I)",
      description:
        "Integrated commercial and residential spaces at the heart of the city’s vibrant growth zone.",
      image: "/imges/product_1.png",
    },
    {
      id: 2,
      locationTags: ["BSD City", "Family Housing"],
      title: "TERRACE HOME | TR-2225",
      description:
        "Eco-friendly housing complex designed for modern families who value sustainability and convenience.",
      image: "/imges/product_2.png",
    },
    {
      id: 3,
      locationTags: ["Bali City", "Luxury Beachfront"],
      title: "TERRACE HOME | TR-1900",
      description:
        "Exclusive beachfront villas offering premium coastal living with panoramic ocean views.",
      image: "/imges/product_3.png",
    },
    {
      id: 4,
      locationTags: ["Bali City", "Luxury Beachfront"],
      title: "GARDEN HOME | RX-5 (II)",
      description:
        "Exclusive beachfront villas offering premium coastal living with panoramic ocean views.",
      image: "/imges/product_4.png",
    },
  ];
  const steps = [
    {
      title: "CONSULTATION",
      description:
        "Meet with our sales team to discuss your preferences, budget, and find the ideal property type.",
    },
    {
      title: "PROPERTY SELECTION",
      description:
        "Choose from our available units and schedule an on-site or virtual tour to explore.",
    },
    {
      title: "DOCUMENTATION",
      description:
        "We assist with paperwork, legal documentation, and financing options for a smooth transaction.",
    },
    {
      title: "HANDOVER",
      description:
        "Receive your new home and enjoy continued support with post-purchase services and care.",
    },
  ];
  return (
    <div className="bg-black ">
      <section className="relative bg-[#020a14] w-full h-[520px] sm:h-[600px] md:h-[700px]  overflow-visible">
        {/* Background wrapper (only this part hidden) */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/imges/home.png"
            alt="Dream Home"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/26"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-2xl text-left space-y-4 text-white md:mt-72">
              <h1 className="text-[32px] mt-[100px] sm:mt-0 sm:text-[42px] font-bold md:text-[46px] leading-tight">
                DISCOVER YOUR DREAM <br />
                HOME WITH TANIA AKTER
              </h1>

              <p className="text-gray-200 text-[15px] max-w-xl">
                Discover elegant and sustainable homes in prime locations,
                thoughtfully designed for modern families who value comfort,
                style, and long-term investment potential.
              </p>


              <div className="flex flex-col w-full gap-6 pt-4 sm:flex-row sm:items-center">

  {/* ===== Explore Properties Button ===== */}
  <button
    className="
      group inline-flex items-center rounded-md
      bg-[#0b1220]/90 hover:bg-[#0b1220]
      transition-all duration-300 ease-out
      px-5 py-3
      hover:shadow-[0_10px_30px_rgba(0,0,0,0.35)]
      hover:-translate-y-[2px]
      active:translate-y-0
    "
  >
    <span
      className="
        mr-3 inline-flex h-6 w-6 items-center justify-center rounded-md
        bg-[#2b7fff]
        transition-transform duration-300 ease-out
        group-hover:rotate-45 group-hover:scale-110
      "
    >
      <svg
        width="18"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        className="text-white"
      >
        <path
          d="M7 17L17 7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M9 7h8v8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>

    <span
      className="
        text-white text-sm tracking-[0.16em]
        transition-transform duration-300
        group-hover:translate-x-[2px]
      "
    >
      EXPLORE PROPERTIES
    </span>
  </button>

  {/* ===== Watch Intro Video Button ===== */}
  <button
    className="
      group inline-flex items-center gap-3
      transition-all duration-300 ease-out
      hover:-translate-y-[2px]
    "
  >
    <span
      className="
        inline-flex h-11 w-11 items-center justify-center rounded-full
        bg-[#2b7fff]
        transition-all duration-300 ease-out
        group-hover:scale-110
        group-hover:shadow-[0_0_0_6px_rgba(43,127,255,0.25)]
      "
    >
      <FaPlay
        className="
          text-white text-sm translate-x-[1px]
          transition-transform duration-300
          group-hover:scale-110
        "
      />
    </span>

    <span
      className="
        text-white text-sm tracking-[0.14em]
        relative
        after:absolute after:left-0 after:-bottom-1
        after:h-[1px] after:w-0 after:bg-white
        after:transition-all after:duration-300
        group-hover:after:w-full
      "
    >
      WATCH INTRO VIDEO
    </span>
  </button>

</div>



            <div className="flex flex-col w-full gap-6 pt-4 sm:flex-row sm:items-center">

                
              </div>
            </div>
          </div>

          {/* ✅ Stats Section: overlap করার জন্য negative margin */}
      <div className="relative z-20 -mb-24 mt-10 hidden sm:block">

            <div className="max-w-6xl mx-auto px-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  {
                    value: "1,200+",
                    title: "HOMES DELIVERED",
                    desc: "Creating comfortable living spaces for families across the country.",
                  },
                  {
                    value: "20+",
                    title: "INDUSTRY EXPERIENCE",
                    desc: "Proven track record of excellence and reliability.",
                  },
                  {
                    value: "115+",
                    title: "ONGOING PROJECTS",
                    desc: "Active developments in prime and high-demand locations.",
                  },
                  {
                    value: "98%",
                    title: "CLIENT SATISFACTION",
                    desc: "High satisfaction from homeowners and investors alike.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-[#404547]/90 text-left backdrop-blur-xl border border-white/20 p-6 rounded-xl"
                  >
                    <h2 className="text-3xl font-bold text-white">
                      {item.value}
                    </h2>
                    <h3 className="text-sm mt-2 text-gray-200">{item.title}</h3>
                    <p className="text-gray-300 text-xs mt-6">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* secent section */}
      

      {/* new section */}
      

      <section className="w-full bg-[#f1f2f4] py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4">
          {/* Top heading + button */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="text-left">
              <p className="text-[10px] sm:text-xs tracking-[0.3em] text-gray-500 uppercase">
                Our Projects
              </p>

              <h2 className="mt-3 font-heading uppercase text-[22px] sm:text-[28px] md:text-[34px] leading-[1.2] tracking-[0.06em] font-light text-[#111827]">
                Explore Our Signature <br />
                Developments &amp; Communities
              </h2>
            </div>

            {/* View All Projects button */}
            <button className="group flex items-stretch rounded-md overflow-hidden shadow-md">
              <span className="bg-[#020617] px-3 py-3 flex items-center justify-center">
                <FiArrowUpRight className="text-white text-sm transition group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" />
              </span>
              <span className="bg-[#5fa8fc] text-white text-[11px] md:text-[12px] tracking-[0.18em] font-medium px-4 py-3 uppercase transition group-hover:bg-[#74b6ff]">
                View All Projects
              </span>
            </button>
          </div>

          {/* Cards grid */}
          <div className="mt-10 sm:mt-12 grid gap-10 md:grid-cols-2">
            {projects.map((project) => (
              <div
                key={project.id}
                className="relative overflow-hidden rounded-2xl bg-[#e9eaee] shadow-[0_18px_50px_rgba(0,0,0,0.12)]"
              >
                {/* Fixed ratio like screenshot */}
                <div className="relative h-[420px] sm:h-[460px] md:h-[630px]">
                  {/* Background image (cover like screenshot) */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Soft dark overlay */}
                  <div className="absolute inset-0 bg-black/15" />

                  {/* Top-left title */}
                  <div className="absolute left-6 top-6 z-20">
                    <h3 className="font-heading text-white/90 text-[14px] sm:text-[16px] tracking-[0.12em] uppercase drop-shadow">
                      {/* {project.topTitle || project.title} */}
                    </h3>

                    {/* tags */}
                    <div className=" flex flex-wrap gap-2 mt-16">
                      {(project.locationTags || []).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-2 rounded-full bg-white/25 backdrop-blur px-3 py-1 text-[11px] text-white/90"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Top-right logo (optional) */}
                  {project.logo && (
                    <div className="relative h-[420px] sm:h-[460px] md:h-[520px] overflow-hidden rounded-2xl">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover object-top"
                      />

                      {/* soft overlay like design */}
                      <div className="absolute inset-0 bg-black/10" />
                    </div>
                  )}

                  {/* Bottom info card (floating centered, like screenshot) */}
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-5 z-20 w-[88%] sm:w-[80%]">
                    <div className="bg-white rounded-md px-5 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.18)] border border-black/5">
                      <h4 className="font-heading text-[#111827] text-[12px] sm:text-[13px] tracking-[0.14em] uppercase mb-2">
                        {project.bottomTitle || project.title}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-gray-600 leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom subtle fade (depth) */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/25 to-transparent" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* next section */}
      <AboutSection></AboutSection>
      {/* new section */}

      <section className="w-full bg-[#050b16] text-white py-20 px-6">
        <div className="max-w-6xl mx-auto grid gap-16 lg:grid-cols-2">
          {/* LEFT SIDE */}
          <div className="text-left">
            <p className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-3">
              What We Offer
            </p>
            <h2 className="text-2xl md:text-4xl leading-tight tracking-[0.06em] font-light">
              STEP-BY-STEP JOURNEY <br /> TO YOUR DREAM HOME
            </h2>
            <img
              src="/imges/Rectangle_007.png" // তোমার image path
              alt="Dream Home"
              className=" md:w-4/5   rounded-md mt-10"
            />

            {/* <div className="mt-10 h-[260px] md:h-[320px] bg-gray-500/40 rounded-xl" > </div> */}
          </div>

          {/* RIGHT SIDE – TIMELINE */}
          {/* RIGHT SIDE – TIMELINE */}
          <div className="relative pl-10 text-left">
            {/* main vertical dashed line */}
            <div className="absolute ml-9 left-[9px] top-2 bottom-2 border-l-2 border-dashed border-gray-500/80" />

            <div className="space-y-10">
              {steps.map((step, index) => (
                <div key={step.title} className="relative flex gap-6">
                  {/* dot */}
                  <div className="relative z-10 flex items-start">
                    <span
                      className={
                        "w-4 h-4 rounded-full border-2 mt-1 " +
                        (index === 0
                          ? "border-[#5fa8fc] bg-[#5fa8fc]"
                          : "border-white bg-white")
                      }
                    />
                  </div>

                  {/* content */}
                  <div>
                    <h3 className="text-sm md:text-base tracking-[0.18em] uppercase mb-1">
                      {step.title}
                    </h3>
                    <p className="text-sm text-left text-gray-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* new section */}
      <OurTeam></OurTeam>

      {/* new section */}

      <section className="w-full bg-[#f3f4f6] py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Top row: title + rating */}
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="text-left">
              <p className="text-xs tracking-[0.3em] text-gray-500 uppercase mb-2">
                Client Stories
              </p>
              <h2 className="text-2xl md:text-4xl leading-tight tracking-[0.05em] text-[#111827] font-light">
                WHAT OUR HAPPY HOME <br />
                OWNERS SAY ABOUT US
              </h2>
            </div>

            {/* rating + bubbles */}
            <div className="flex items-center gap-4">
              {/* grey bubbles */}
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <span
                    key={i}
                    className="w-8 h-8 rounded-full bg-[#d1d5db] border-2 border-[#f3f4f6]"
                  />
                ))}
              </div>

              {/* rating text */}
              <div className="text-xs md:text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <FaStar className="text-[#3b82f6]" />
                  <span className="font-medium text-gray-800">
                    4.9/5 Rating customers
                  </span>
                </div>
                <p className="text-[11px] text-gray-500">
                  Trusted by 1,200+ customers
                </p>
              </div>
            </div>
          </div>

          {/* middle content */}
          <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)] items-end">
            {/* left images */}
            <div className="flex items-end gap-4">
              <div className="w-32 h-40 rounded-xl bg-gray-400/70">
                <img
                  src="/imges/Rectangle_09.png" // তোমার image path
                  alt="Dream Home"
                  className=" w-full h-full"
                />
              </div>
              <div className="flex-1 h-56 md:h-64 rounded-xl bg-gray-400/80">
                 <img
                  src="/imges/Rectangle_10.png" // তোমার image path
                  alt="Dream Home"
                  className=" w-full h-full"
                />
              </div>
            </div>

            {/* right text */}
            <div className="space-y-8 text-left">
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                {current.text}
              </p>
              <div>
                <p className="text-xs md:text-sm tracking-[0.18em] uppercase text-gray-900">
                  {current.name}
                </p>
                <p className="text-xs md:text-sm text-gray-500">
                  {current.role}
                </p>
              </div>
            </div>
          </div>

          {/* bottom controls */}
          <div className="mt-10 flex items-center justify-end gap-6">
            {/* left / right buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="w-9 h-9 flex items-center justify-center border border-gray-400 rounded-md hover:bg-white transition"
              >
                <FaArrowLeft className="text-xs text-gray-700" />
              </button>
              <div className="flex items-center gap-3">
                {/* page indicator */}
                <div className="text-xs md:text-sm font-medium text-gray-800 flex items-center gap-1">
                  <span className="text-[#111827]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-gray-400">
                    / {String(total).padStart(2, "0")}
                  </span>
                </div>

                {/* underline progress */}
                <div className="relative w-20 h-[2px] bg-gray-300 overflow-hidden">
                  <div
                    className="absolute left-0 top-0 h-full bg-[#3b82f6] transition-all duration-300"
                    style={{ width: `${((index + 1) / total) * 100}%` }}
                  />
                </div>
              </div>

              <button
                onClick={handleNext}
                className="w-9 h-9 flex items-center justify-center rounded-md bg-[#3b82f6] hover:bg-[#2563eb] transition"
              >
                <FaArrowRight className="text-xs text-white" />
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* new section */}
      <CommonQuestions></CommonQuestions>
    </div>
  );
};
