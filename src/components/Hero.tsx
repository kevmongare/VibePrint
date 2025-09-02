// components/Hero.jsx
import { useState, useEffect } from 'react';
import bg from '../assets/LandingPage/bg.png';

const Hero = () => {
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    "Free Consultancy",
    "100% satisfaction guarantee",
    "Secure payment processing",
    "Easy returns within 30 days"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <section className="relative bg-white overflow-hidden h-[95vh] flex items-center justify-center pt-20">
      {/* Background with dark overlay */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0 bg-fixed"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.6)), url(${bg})`,
        }}
      ></div>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10 py-16 sm:py-24 text-center text-white">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#FF6F20] text-white text-sm font-semibold mb-6">
          Limited Time: Free consultancy
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          Elevate Your Brand <br className="hidden sm:inline" /> with{" "}
          <span className="text-[#FF6F20]">Premium</span> Merchandise
        </h1>

        {/* Subheading */}
        <p className="mt-6 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed font-extralight">
          Create custom branded products that your customers will love. From
          apparel to accessories, we help you make a lasting impression with
          quality you can trust.
        </p>

        {/* Rotating Features */}
        <div className="mt-4 h-8">
          <div
            key={currentFeature}
            className="text-[#FF6F20] font-medium text-xl animate-fadeIn"
          >
            ✓ {features[currentFeature]}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <button className="relative bg-[#007BFF] text-white px-8 py-4 rounded-xl text-base font-semibold shadow-md hover:bg-[#0062cc] transition transform hover:-translate-y-1 duration-300 group">
            Explore Products
          </button>
          <button className="relative border-2 border-[#FF6F20] text-[#FF6F20] px-8 py-4 rounded-xl text-base font-semibold hover:bg-[#FF6F20] hover:text-white transition transform hover:-translate-y-1 duration-300 group">
            Request a Quote
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Hero;
