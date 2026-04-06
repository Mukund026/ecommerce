import { useState } from "react";

const languages = [
  { name: "English", code: "EN" },
  { name: "हिन्दी", code: "HI" },
  { name: "தமிழ்", code: "TA" },
  { name: "తెలుగు", code: "TE" },
  { name: "ಕನ್ನಡ", code: "KN" },
  { name: "മലയാളം", code: "ML" },
  { name: "বাংলা", code: "BN" },
  { name: "मराठी", code: "MR" }
];

export default function LanguageDropdown() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("English");

  return (
    <div className="relative">

      {/* Navbar Button */}
      <div
        onClick={() => setOpen(!open)}
        className="hidden lg:flex items-center border border-transparent hover:border-white rounded-md px-3 py-2 cursor-pointer"
      >
        <span className="mr-1">🇮🇳</span>
        <span className="text-white text-sm font-semibold">{selected}</span>
        <span className="ml-1 text-white text-xs">▼</span>
      </div>

      {/* Dropdown Card */}
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg border z-50 p-4">

          <p className="text-sm font-semibold mb-3 text-gray-700">
            Change Language
          </p>

          {languages.map((lang) => (
            <label
              key={lang.code}
              className="flex items-center gap-2 py-1 cursor-pointer hover:bg-gray-100 rounded px-2"
            >
              <input
                type="radio"
                name="language"
                checked={selected === lang.name}
                onChange={() => setSelected(lang.name)}
              />
              <span className="text-sm text-gray-800">
                {lang.name} - {lang.code}
              </span>
            </label>
          ))}

          <hr className="my-3" />

          <div className="flex items-center gap-2 text-sm text-gray-600">
            🇮🇳 You are shopping on Market.in
          </div>

          <button className="text-blue-600 text-sm mt-2 hover:underline">
            Change country/region
          </button>

        </div>
      )}
    </div>
  );
}

