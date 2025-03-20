import React from "react";

const Footer = () => {
  return (
    <div className="bg-slate-800 text-white flex flex-col justify-center items-center fixed bottom-0 w-full">
      <div className="logo font-bold text-2xl">
        <span className="text-green-700">&lt;</span>
        Pass
        <span className="text-green-700">OP/&gt;</span>
      </div>
      <div className="flex justify-cneter items-center">
        Created with <img className="w-6 mx-2 py-3" src="/icons/heart_icon.gif" alt="heart" />
      </div>
    </div>
  );
};

export default Footer;
