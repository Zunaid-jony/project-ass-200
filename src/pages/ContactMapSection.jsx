import React from "react";
import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

export const ContactMapSection = () => {
  return (
    <section className="w-full bg-white py-16 px-4 md:px-10 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid text-left grid-cols-1 md:grid-cols-2 gap-10 items-center">
          
          {/* LEFT CONTENT */}
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
              Connecting Near Or Far
            </h2>

            <p className="mt-4 text-gray-600 text-sm md:text-base leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              porta justo eget risus consectetur, non venenatis elit blandit.
              Mauris vehicula, libero a iaculis fringilla, ipsum ipsum tincidunt
              velit, ut convallis velit ante tincidunt dui.
            </p>

            <div className="mt-6 space-y-2 text-sm text-gray-600">
              <p>
                <span className="font-semibold text-gray-800">Address:</span>{" "}
                Chicago, Los Angeles
              </p>
              <p>
                <span className="font-semibold text-gray-800">Mobile:</span>{" "}
                (559) 392-5009
              </p>
              <p>
                <span className="font-semibold text-gray-800">Email:</span>{" "}
                agency06@gmail.com
              </p>
            </div>

            {/* SOCIAL ICONS */}
            <div className="flex items-center gap-4 mt-6">
              <a
                href="#"
                className="w-9 h-9 rounded-md bg-gray-100 flex items-center justify-center text-blue-500 hover:bg-blue-100 transition"
              >
                <FaTwitter size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-md bg-gray-100 flex items-center justify-center text-blue-700 hover:bg-blue-100 transition"
              >
                <FaFacebookF size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-md bg-gray-100 flex items-center justify-center text-pink-600 hover:bg-pink-100 transition"
              >
                <FaInstagram size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-md bg-gray-100 flex items-center justify-center text-red-600 hover:bg-red-100 transition"
              >
                <FaYoutube size={16} />
              </a>
            </div>
          </div>

          {/* RIGHT MAP */}
          <div className="w-full h-[320px] md:h-[380px] rounded-2xl overflow-hidden shadow-md border border-gray-100">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps?q=New%20York&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
