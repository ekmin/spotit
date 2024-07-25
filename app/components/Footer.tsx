import React from "react";

const Footer = () => {
  return (
    <footer className="relative flex justify-center bg-primary-color p-4 md:text-sm text-xs">
      <div className="flex items-center gap-1">
        <p>Made with</p>
        <div className="group flex justify-center">
          <button className="text-orange-500">🩵</button>
          <span className="absolute bottom-14 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100 text-center left-0 right-0 mx-auto max-w-[720px]">
            ⚠️ This app is powered by Gemini. "Gemini may display inaccurate
            info, including about people, so double-check its responses." ⚠️
          </span>
        </div>
        <p>
          by{" "}
          <a
            href="https://github.com/ekmin"
            className="hover:text-secondary-dark-color transition-colors"
          >
            Ekmin Samaraweera
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
