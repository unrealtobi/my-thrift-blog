import React from "react";
import { RiFacebookFill } from "react-icons/ri";
import {
  FaTiktok,
  FaInstagram,
  FaXTwitter,
  FaWhatsapp,
  FaTelegram,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-black font-poppins border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center md:items-start justify-between text-center md:text-left">
        {/* Left: Navigation */}
        <div className="flex flex-col items-start gap-6 w-full md:w-1/3 mb-6 md:mb-0">
          <a
            href="https://www.shopmythrift.store/newhome"
            className="text-base border-b border-gray-400 font-semibold hover:text-customOrange transition-colors"
          >
            My Thrift
          </a>
          <a
            href="https://www.shopmythrift.store/vendor-signup"
            className="text-base border-b border-gray-400 font-semibold hover:text-customOrange transition-colors"
          >
            Sell
          </a>
          <a
            href="https://www.shopmythrift.store/send-us-feedback"
            className="text-base border-b border-gray-400 font-semibold hover:text-customOrange transition-colors"
          >
            Help
          </a>
        </div>

        {/* Center: Social Icons */}
        <div className="flex justify-center items-center gap-4 w-full md:w-1/3 mb-6 md:mb-0">
          <a
            href="https://www.tiktok.com/@mythriftng?_t=ZM-8urkH3nXpUD&_r=1"
            aria-label="TikTok"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl hover:text-customOrange transition-colors"
          >
            <FaTiktok />
          </a>
          <a
            href="https://www.instagram.com/mythriftng?igsh=MTFzM2tkMXp2Z2RpYg=="
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl hover:text-customOrange transition-colors"
          >
            <FaInstagram />
          </a>
          <a
            href="https://x.com/mythriftng"
            aria-label="X"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl hover:text-customOrange transition-colors"
          >
            <FaXTwitter />
          </a>
          <a
            href="https://www.facebook.com/share/19tx8YjQpu/?mibextid=qi2Omg"
            aria-label="Facebook"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl hover:text-customOrange transition-colors"
          >
            <RiFacebookFill />
          </a>
        </div>

        {/* Right: Catchphrase */}
        <div className="w-full md:w-1/3 text-sm text-gray-600 font-opensans text-center md:text-right">
          Skip the local markets!
          <br />
          Shop preloved items from curated vendors 🧡
        </div>
      </div>

      {/* Bottom Note */}
      <div className="text-center text-xs text-gray-500 pb-6">
        © {new Date().getFullYear()} My Thrift. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
