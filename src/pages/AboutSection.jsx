import { FiArrowUpRight } from "react-icons/fi";
import { LuTrophy, LuMapPin, LuLeaf, LuUsers } from "react-icons/lu";

export default function AboutSection() {
  return (
    <section className="w-full bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Top heading */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] text-gray-500 uppercase mb-2">
           About Bangla Bosoti
          </p>
          <h2 className="text-2xl md:text-4xl leading-tight tracking-[0.05em] text-[#111827] font-light">
            Building Homes That 
 <br /> Stand the Test of Time
          </h2>
          <p className="mt-4 text-sm md:text-base text-gray-600 leading-relaxed">
          At Bangla Bosoti, we don’t just build houses—we create lasting homes designed to improve your lifestyle, protect your investment, and secure your family’s future. Every project is crafted with care, quality, and long-term value, ensuring you get a home that grows in worth and comfort year after year.
          </p>

          {/* Button */}
          <div className="mt-6 flex justify-center">
            <button className="flex bg-[#5fa8fc] items-center p-1 rounded-md overflow-hidden shadow-md group">
              {/* icon box */}
              <span className="bg-[#020617]  px-3 py-3 flex items-center justify-center">
                <FiArrowUpRight className="text-white text-sm group-hover:translate-x-1 transition" />
              </span>
              {/* text box */}
              <span className="bg-[#5fa8fc] text-white text-[11px] md:text-[12px] tracking-[0.18em] font-medium px-4 py-3 group-hover:bg-[#74b6ff] transition uppercase">
                More About Us
              </span>
            </button>
          </div>
        </div>

        {/* Bottom grid */}
        <div className="mt-14 grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          {/* Left big image block */}
          <div className="bg-[#d4d4d4] rounded-xl h-[360px] " >

            <img
                src="/imges/Rectangle_001.png" // তোমার image path
                alt="Dream Home"
                className=" "
              />
          </div>
           

          {/* Right feature grid */}
          <div className="grid gap-4">
            {/* Top row: 2 cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FeatureCard
                icon={<LuTrophy className="text-lg" />}
                title="AWARD-WINNING"
                description="Recognized for innovation and good architectural excellence."
              />
              <FeatureCard
                icon={<LuMapPin className="text-lg" />}
                title="PRIME LOCATIONS"
                description="Every development is strategically located for value & convenience."
              />
            </div>

            {/* Middle row: 2 cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FeatureCard
                icon={<LuLeaf className="text-lg" />}
                title="ECO-FRIENDLY"
                description="Eco-friendly housing complex with good design, sustainability & convenience."
              />
              <FeatureCard
                icon={<LuUsers className="text-lg" />}
                title="CLIENT-CENTRIC"
                description="Dedicated to transparency, quality, and long-term relationships."
              />
            </div>

            {/* Bottom wide block (image / extra content placeholder) */}
            <div className="w-full rounded-xl " >
               <img
                src="/imges/Rectangle_002.png" // তোমার image path
                alt="Dream Home"
                className=" w-full object-cover md:h-[300px] rounded-md"
              />
            </div>
          </div>
        
      
        </div>
      </div>
    </section>
  );
}

/* small feature card component */
function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-[#f3f4f6] rounded-lg px-5 py-4 flex items-start gap-3 shadow-sm">
      <div className="mt-1 text-gray-700">{icon}</div>
      <div>
        <h3 className="text-xs md:text-sm tracking-[0.18em] uppercase text-[#111827] font-semibold">
          {title}
        </h3>
        <p className="mt-1 text-xs md:text-sm text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
