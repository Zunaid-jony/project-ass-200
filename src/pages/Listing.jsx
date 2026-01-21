import React from 'react'
import { FaMapMarkerAlt, FaStar } from 'react-icons/fa';

export const Listing = () => {

  const images = [
  "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg",
  "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
  "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
  "https://images.pexels.com/photos/323775/pexels-photo-323775.jpeg",
  "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
];
  return (
    <div>
    {/* <div className="bg-black ">
      <section className="w-full bg-gradient-to-b from-[#d6d6d6] to-[#1f1f1f] text-white py-20 px-6"> */}
 <section className="bg-white pt-24 pb-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* top heading + price row */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">
              High-Rise Townhouse In California
            </h1>

            {/* status + rating + reviews */}
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="px-3 py-1 rounded-full bg-blue-50 text-xs font-medium text-blue-600">
                For Rent
              </span>

              {/* rating */}
              <div className="flex items-center gap-1 text-xs text-slate-600">
                <div className="flex items-center text-yellow-400">
                  <FaStar className="w-3 h-3" />
                  <FaStar className="w-3 h-3" />
                  <FaStar className="w-3 h-3" />
                  <FaStar className="w-3 h-3" />
                  <FaStar className="w-3 h-3" />
                </div>
                <span className="ml-1 text-slate-700 font-medium">5.0</span>
                <span className="text-slate-500">(2 Reviews)</span>
              </div>

              {/* location */}
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <FaMapMarkerAlt className="w-3 h-3 text-blue-500" />
                <span>Southwestern Ontario, Ontario, Canada</span>
              </div>
            </div>
          </div>

          {/* price block */}
          <div className="text-right space-y-1">
            <p className="text-2xl font-semibold text-blue-700">$425,000</p>
            <p className="text-xs text-slate-500">1,200 Sq Ft</p>
          </div>
        </div>

        {/* gallery */}
        <div className="mt-6 grid gap-4 md:grid-cols-[2fr_1.2fr]">
          {/* big image */}
          <div className="rounded-xl overflow-hidden h-[260px] md:h-[340px]">
            <img
              src={images[0]}
              alt="Main view"
              className="w-full h-full object-cover"
            />
          </div>

          {/* small grid */}
          <div className="grid grid-cols-2 grid-rows-2 gap-4 h-[260px] md:h-[340px]">
            {images.slice(1, 5).map((img, idx) => {
              const isLast = idx === 3;
              return (
                <div
                  key={img}
                  className="relative rounded-xl overflow-hidden"
                >
                  <img
                    src={img}
                    alt={`Gallery ${idx + 2}`}
                    className="w-full h-full object-cover"
                  />

                  {/* +1 overlay only for last card */}
                  {isLast && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="px-4 py-2 rounded-lg bg-black/60 text-white text-sm font-medium">
                        +1
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* small pink slider indicator like screenshot */}
        <div className="mt-4 flex justify-center">
          <div className="w-10 h-1 rounded-full bg-pink-400" />
        </div>
      </div>
    </section>

    </div>
  )
}
