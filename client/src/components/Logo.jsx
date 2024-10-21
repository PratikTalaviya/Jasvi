import React from "react";
import LogoImage from "../images/newlogo.png";
import Image from "../images/textlogo.png";

function Logo() {
  return (
    <div className="flex items-center md:justify-start gap-3">
      {/* <img className="h-[4rem]" src={LogoImage} /> */}
      <div className="leading-none">
        {/* <p className="text-[2.02rem] font-semibold">Jasvi Creation</p> */}
        {/* <p className="pt-[0.1rem]">"Where Fashion Meets Trend"</p> */}
        <p className="text-[2.02rem] font-semibold tracking-[0.02rem]">JASVI CREATION</p>
        <p className="mt-[0.3rem] tracking-[0.08rem]">"Where Fashion Meets Trend"</p>
      </div>
    </div>
  );
}

export default Logo;
