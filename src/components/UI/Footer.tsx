import React from "react";

const Footer = () => {
  return (
    <footer className="fl_between bg-gray-200py-2 relative z-30 border-t-[1px] border-solid border-dark px-32 py-4 font-roboto lg:px-16 md:flex-col md:px-4">
      <p className="text-dark/50 dark:text-light/50">
        {new Date().getFullYear()} &copy; All Right Reserved.
      </p>
      <p className="text-sm text-dark/50 dark:text-light/50">
        design by
        <span className="font-rouge text-lg text-dark dark:text-light">
          Min
        </span>
      </p>
    </footer>
  );
};

export default Footer;
