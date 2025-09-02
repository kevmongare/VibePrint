import type { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import LogoSaf from '../assets/CompaiesWorkedWith/Safaricom.png'
import LogoCala from '../assets/CompaiesWorkedWith/Cala.webp'
import LogoJumia from  '../assets/CompaiesWorkedWith/Jumia-Logo.png'
import LogoKyeop from '../assets/CompaiesWorkedWith/KYEOPLogo.png'
import LogoBritam from '../assets/CompaiesWorkedWith/BritamLogo-removebg-preview.png'
import LogoKICC from '../assets/CompaiesWorkedWith/KICCLogo-removebg-preview.png'

// Example logos - replace with your own
const companyLogos: string[] = [
  LogoSaf,
  LogoCala,
  LogoJumia,
  LogoKyeop,
  LogoBritam,
  LogoKICC,
];

const CompanySlider: FC = () => {
  return (
    <div className="w-full bg-white py-4 ">
        <h1 className="p-2 font-extralight text-sm text-center text-gray-500">Trusted By Top Companies In Kenya:</h1>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={2}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
        loop={true}
      >
        {companyLogos.map((logo, index) => (
          <SwiperSlide key={index}>
            <div className="flex justify-center items-center">
              <img
                src={logo}
                alt={`Company ${index + 1}`}
                className="h-14 w-auto object-contain  hover:grayscale-0 transition duration-300"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
    </div>
  );
};

export default CompanySlider;
