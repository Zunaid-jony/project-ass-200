import { useState } from "react";

const tabs = [
  { id: "property", label: "Property Information" },
  { id: "buying", label: "Buying Process" },
  { id: "financing", label: "Financing & Payment" },
  { id: "afterSales", label: "After-Sales" },
  { id: "foreign", label: "Foreign Buyer" },
];

const faqData = {
  property: [
    {
      id: "p1",
      question: "WHAT TYPES OF PROPERTIES NUVANTA OFFER?",
      answer:
        "We offer residential homes, villas, and mixed-use developments in premium and strategic locations.",
    },
    {
      id: "p2",
      question: "ARE YOUR PROPERTIES READY TO MOVE IN?",
      answer:
        "Some units are move-in-ready while others are still in development with clear completion timelines.",
    },
    {
      id: "p3",
      question: "CAN I VISIT THE SITE BEFORE BUYING?",
      answer:
        "Yes, you can schedule a guided site tour with our sales consultants.",
    },
    {
      id: "p4",
      question: "DO YOU PROVIDE FINANCING OPTIONS?",
      answer:
        "We collaborate with trusted banks to offer flexible installment and financing programs.",
    },
    {
      id: "p5",
      question: "HOW DO I RESERVE A UNIT?",
      answer:
        "You can reserve a unit by submitting booking documents and a reservation fee.",
    },
  ],

  buying: [
    {
      id: "b1",
      question: "WHAT DOCUMENTS ARE REQUIRED TO PURCHASE?",
      answer:
        "You’ll need identification documents, proof of income, and signed booking forms.",
    },
    {
      id: "b2",
      question: "HOW LONG DOES THE BUYING PROCESS TAKE?",
      answer:
        "Depending on documentation and payment schedule, the process usually takes 7–30 days.",
    },
    {
      id: "b3",
      question: "CAN I BUY REMOTELY?",
      answer:
        "Yes, we offer virtual tours, online consultations, and digital signing options.",
    },
  ],

  financing: [
    {
      id: "f1",
      question: "WHAT PAYMENT METHODS ARE AVAILABLE?",
      answer:
        "You can pay via bank transfer, installment plans, or financing through partnered banks.",
    },
    {
      id: "f2",
      question: "IS THERE A DOWN PAYMENT REQUIRED?",
      answer:
        "Yes, down payment amounts vary depending on project and financing type.",
    },
    {
      id: "f3",
      question: "CAN I PAY IN INSTALLMENTS?",
      answer:
        "Absolutely. We offer flexible milestone-based and monthly installment plans.",
    },
  ],

  afterSales: [
    {
      id: "a1",
      question: "WHAT SUPPORT DO YOU OFFER AFTER HANDOVER?",
      answer:
        "We provide service warranty, maintenance guidance, and community management support.",
    },
    {
      id: "a2",
      question: "WHO DO I CONTACT IF THERE’S AN ISSUE?",
      answer:
        "Our dedicated support team is available via phone, email, and customer portal.",
    },
    {
      id: "a3",
      question: "HOW LONG IS THE WARRANTY PERIOD?",
      answer:
        "Warranty periods depend on the project and components — typically 1–5 years.",
    },
  ],

  foreign: [
    {
      id: "fo1",
      question: "CAN FOREIGNERS BUY PROPERTY?",
      answer:
        "Eligible foreign buyers can purchase units depending on local property regulations.",
    },
    {
      id: "fo2",
      question: "ARE THERE EXTRA DOCUMENTS NEEDED?",
      answer:
        "Yes — passport, proof of foreign residency status, and financial verification documents.",
    },
    {
      id: "fo3",
      question: "CAN FOREIGN BUYERS APPLY FOR FINANCING?",
      answer:
        "Financing availability varies by bank and region — our legal team can guide you.",
    },
  ],
};


export default function CommonQuestions() {
  const [activeTab, setActiveTab] = useState("property");
  const [openIds, setOpenIds] = useState(new Set(["p1", "p6"])); // প্রথম দুইটা খোলা থাকবে

  const currentFaqs = faqData[activeTab] || [];

  const toggleItem = (id) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section className="w-full bg-[#f3f4f6] py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] text-gray-500 uppercase mb-2">
            Common Questions
          </p>
          <h2 className="text-2xl md:text-4xl leading-tight tracking-[0.05em] text-[#111827] font-light">
            EVERYTHING YOU NEED TO <br />
            KNOW BEFORE BUYING
          </h2>
        </div>

        {/* Tabs */}
        <div className="mt-10 border-b border-gray-300">
          <div className="flex flex-wrap gap-6 text-sm md:text-base">
            {tabs.map((tab) => {
              const isActive = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-3 border-b-2 -mb-[1px] transition text-sm ${
                    isActive
                      ? "border-[#3b82f6] text-[#3b82f6] font-medium"
                      : "border-transparent text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ grid */}
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {currentFaqs.map((item, idx) => (
            <FAQItem
              key={item.id}
              item={item}
              isOpen={openIds.has(item.id)}
              onToggle={() => toggleItem(item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div
      className={`bg-white rounded-md shadow-sm cursor-pointer transition border ${
        isOpen ? "border-[#3b82f6]/50" : "border-transparent"
      }`}
      onClick={onToggle}
    >
      <div className="flex items-center justify-between px-5 py-4">
        <div>
          <p
            className={`text-xs md:text-sm tracking-[0.18em] uppercase ${
              isOpen ? "text-[#3b82f6]" : "text-gray-700"
            }`}
          >
            {item.question}
          </p>
        </div>
        <span className="ml-4 text-lg text-gray-500">
          {isOpen ? "−" : "+"}
        </span>
      </div>

      {isOpen && (
        <div className="px-5 pb-4 text-left text-xs md:text-sm text-gray-600 leading-relaxed border-t border-gray-100">
          {item.answer}
        </div>
      )}
    </div>
  );
}
