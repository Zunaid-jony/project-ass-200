import React from "react";
import { ContactMapSection } from "./ContactMapSection";

export const Contact = () => {
  return (
   <div>
     <section className="w-full bg-white py-16 px-4 md:px-10 lg:px-24">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-10">
          Contact Us
        </h2>

        {/* Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
          {/* Left Image */}
          <div className="rounded-2xl overflow-hidden shadow-md bg-gray-100 h-[420px]">
            <img
              src="/imges/contract.png"
              alt="Contact"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Form Card */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 h-[420px] flex flex-col justify-center p-6 md:p-8">
            <h3 className="text-2xl font-semibold text-gray-900 text-center">
              Get In Touch
            </h3>
            <p className="text-center text-gray-500 text-sm mt-2">
              Please enter your details to create a new account.
            </p>

            <form className="mt-6 space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#254b86]"
              />

              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#254b86]"
              />

              <textarea
                rows={3}
                placeholder="Tell us a little bit about your destination dream"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#254b86] resize-none"
              />

              <button
                type="submit"
                className="w-full rounded-lg bg-[#254b86] text-white py-3 text-sm font-medium hover:bg-blue-900 transition"
              >
                Submit Now
              </button>

              <p className="text-center text-[11px] text-gray-500 mt-2">
                By contacting us, you agree to your{" "}
                <span className="underline cursor-pointer">Terms Of Service</span>{" "}
                and{" "}
                <span className="underline cursor-pointer">Privacy Policy</span>
              </p>
            </form>
          </div>
        </div>
      </div>
    
    </section>
    {/*  */}
       <ContactMapSection></ContactMapSection>
   </div>
   
  );
};
