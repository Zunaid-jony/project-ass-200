export const getDropdownPT = ({
  heightClass = "h-12",
  roundedClass = "rounded-2xl",
  triggerBg = "#4f5bd5",
  brand = "#4f5bd5",
} = {}) => ({
  root: {
    className: `${heightClass} ${roundedClass} border border-slate-300 bg-white flex items-center overflow-hidden`,
  },
  input: {
    className: "px-4 text-slate-700 font-medium flex items-center h-full",
  },
  trigger: {
    className: `w-12 h-full flex items-center justify-center text-white`,
    style: { backgroundColor: triggerBg },
  },
  panel: {
    className:
      "mt-2 rounded-2xl overflow-hidden border border-slate-200 shadow-2xl bg-white",
  },
  filterContainer: {
    className: "p-3 border-b border-slate-100 bg-white",
  },
  filterInput: {
    className:
      "w-full px-3 py-2 border border-slate-200 rounded-xl outline-none",
    style: { outline: "none" },
  },
  wrapper: {
    className: "max-h-60 overflow-auto",
  },
  item: {
    className:
      "px-4 py-3 text-slate-700 font-medium cursor-pointer transition hover:bg-slate-100",
  },
  emptyMessage: {
    className: "px-4 py-6 text-center text-sm text-slate-500",
  },
});
