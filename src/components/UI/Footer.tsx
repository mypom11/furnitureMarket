import React from "react";

const Footer = () => {
  return (
    <footer className="fl_between bg-gray-200 border-t-[1px] border-solid border-dark px-32 py-2">
      <p className="text-dark/50">
        {new Date().getFullYear()} &copy; All Right Reserved.
      </p>
      <div>
        <address className="text-sm font-thin">
          서울 강남구 강남 빌딩 7층
        </address>
        <p className="text-sm font-thin">02-234-1234</p>
      </div>
    </footer>
  );
};

export default Footer;
