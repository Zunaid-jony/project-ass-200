import React from "react";

export const About = () => {
  return (
    <div className="bg-[##ffffff]">
      {/*  <div className="max-w-6xl mx-auto"> */}

      <section className="w-full py-14 px-4 md:px-10 lg:px-20 mt-10 !bg-[##ffffff]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
            About Us
          </h2>
          <p className="mt-2 text-gray-600 text-sm md:text-base">
            We provide smart real estate solutions, connecting clients with
            their dream homes.
          </p>
        </div>

        <div className="w-full max-w-5xl h-[70vh] mx-auto overflow-hidden rounded-xl shadow-lg mt-10">
          <img
            src="/imges/aboutIMG.png"
            alt="Team meeting"
            className="w-full object-cover"
          />
        </div>
      </section>

      {/* new section */}

      <section className="w-full py-16 px-4 md:px-10 lg:px-24">
        {/* Heading */}
        <h2 className="text-center text-3xl md:text-4xl font-semibold text-gray-900 mb-12">
          Our Vision
        </h2>

        {/* Icons Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center mb-20">
          {/* Box 1 */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-gray-100 shadow-sm mb-4">
              <img
                src="/imges/one.png"
                alt="Creating Lifelong Partnerships"
                className="w-12 h-12"
              />
            </div>
            <h3 className="font-semibold text-lg text-gray-800">
              Creating Lifelong Partnerships
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Building trust and strong relationships for long-term success.
            </p>
          </div>

          {/* Box 2 */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-gray-100 shadow-sm mb-4">
              <img
                src="/imges/two.png"
                alt="Empowering Decisions"
                className="w-12 h-12"
              />
            </div>
            <h3 className="font-semibold text-lg text-gray-800">
              Empowering Decisions
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Helping you make confident and informed choices.
            </p>
          </div>

          {/* Box 3 */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-gray-100 shadow-sm mb-4">
              <img
                src="/imges/three.png"
                alt="Innovating For Tomorrow"
                className="w-12 h-12"
              />
            </div>
            <h3 className="font-semibold text-lg text-gray-800">
              Innovating For Tomorrow
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Creating sustainable and forward-thinking solutions.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Working Online Image */}
          <div className="rounded-xl overflow-hidden shadow-lg bg-gray-200">
            <img
              src="/imges/aboutTow.png"
              alt="team"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="text-left">
            <h3 className="text-2xl text-left md:text-3xl font-semibold text-gray-900 mb-4">
              Our Story
            </h3>
            <p className="text-gray-600 mb-3 leading-relaxed">
              RealPro is proud to be a trusted leader in real estate, offering
              comprehensive solutions and professional services in the property
              industry. With over 10 years of experience, we continue to grow
              and innovate, upholding a tradition of quality and reliability.{" "}
            </p>
            <p className="text-gray-600 mb-3 leading-relaxed">
              At RealPro, we are committed to putting clients first, dedicated
              to helping them find their dream homes or valuable investment
              opportunities. Our team of seasoned experts is always ready to
              share deep market insights and knowledge to provide clients with
              the best options available.
            </p>
            <p className="text-gray-600 mb-3 leading-relaxed">
              RealPro is more than just a real estate company – we are a
              reliable partner, walking with you every step of the way in
              building your home and growing your investments with confidence.
            </p>
            <button className="mt-5 px-6 py-3 bg-[#254b86] text-white rounded-lg hover:bg-blue-800 transition shadow-md">
              Explore Now
            </button>
          </div>
        </div>
      </section>

      {/* our mision */}

      {/* ===== NEW SECTION: Mission + Team (Add after your previous section) ===== */}
      <section className="w-full py-16 px-4 md:px-10 lg:px-24 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Our Mission */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Left content */}
            <div className="text-right">
              <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
                Our Mission
              </h2>

              <p className="mt-4 text-gray-600 leading-relaxed">
                At RealPro, our mission is to be a trusted partner in every real
                estate journey. We are committed to providing expert guidance
                and personal solutions to help clients realize their dreams of a
                ideal home or a rewarding investment opportunity.
              </p>

              <p className="mt-4 text-gray-600 leading-relaxed">
                We prioritize our clients at every step and strive to create
                sustainable value for both our community and the real estate
                market. RealPro is not just about buying property — we build
                trust, peace of mind, and a prosperous future for all our
                clients.
              </p>

              <button className="mt-6 inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#254b86] text-white hover:bg-blue-900 transition shadow-sm">
                Explore Now
              </button>
            </div>

            {/* Right image */}
            <div className="rounded-2xl overflow-hidden shadow-lg bg-gray-100">
              <img
                src="/imges/mision.png"
                alt="Our Mission"
                className="w-full h-[320px] md:h-[410px] object-cover"
              />
            </div>
          </div>

          {/* Meet The Team */}
          <div className="mt-20">
            <h2 className="text-center text-3xl md:text-4xl font-semibold text-gray-900">
              Meet The Team
            </h2>
            <p className="text-center text-gray-600 text-sm md:text-base mt-3 max-w-2xl mx-auto">
              Get to know the dedicated professionals behind RealPro — a team of
              experienced experts passionate about guiding you through every
              step of your real estate journey.
            </p>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  img: "/imges/tem1.png",
                  name: "Rachel Dan",
                  role: "CFO - Chief Financial Officer",
                },
                {
                  img: "/imges/team2.png",
                  name: "Rachel Dan",
                  role: "CEO - Chief Executive Officer",
                },
                {
                  img: "/imges/tem3.png",
                  name: "Rachel Dan",
                  role: "Sales Director",
                },
              ].map((m, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl overflow-hidden"
                >
                  {/* image */}
                  <div className="relative">
                    <img
                      src={m.img}
                      alt={m.name}
                      className="w-full h-[300px] "
                    />

                    {/* bottom info strip */}
                    {/* <div className="absolute left-3 right-3 bottom-3 bg-white/95 backdrop-blur rounded-xl px-4 py-3 flex items-center justify-between shadow-sm">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {m.name}
                        </p>
                        <p className="text-[12px] text-gray-500">{m.role}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-gray-700"
                          title="Close"
                        >
                          ✕
                        </button>

                        <a
                          href="#"
                          className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-700 hover:text-[#254b86]"
                          title="LinkedIn"
                        >
                          in
                        </a>
                      </div>
                    </div> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
