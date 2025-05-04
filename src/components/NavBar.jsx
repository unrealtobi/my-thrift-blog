"use client";

import { useState, useEffect } from "react";
import { LuMenu } from "react-icons/lu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { client } from "../../lib/sanity";

const REACT_APP_DOMAIN = "https://www.shopmythrift.store/";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dealCount, setDealCount] = useState(0);
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Check if Next.js route is active
  const isActiveLink = (path) => pathname === path;

  // Fetch the number of deals from Sanity

  return (
    <nav className="bg-white  border-b border-gray-200 fixed w-full z-50">
      <div className="mx-auto px-4 md:px-8 md:h-20 sm:h-20 md:py-5 py-5 flex items-center justify-between h-20">
        {/* Logo Section */}
        <Link href="/">
          <Image
            src="/logobg.png"
            alt="Logo"
            width={100}
            height={306}
            className="md:h-36 md:w-auto sm:h-36 sm:w-auto cursor-pointer"
          />
        </Link>

        {/* Desktop Navigation Links */}

        {/* Contact Us Button */}
        <div>
          <a
            href={`${REACT_APP_DOMAIN}/newhome`}
            className="relative md:block hidden bg-customOrange text-sm font-roboto font-medium text-white px-6 py-3 rounded-md shadow-md hover:shadow-lg hover:bg-customDeepOrange transition-colors duration-300 ease-in-out"
          >
            <span className="relative z-10">Shop Now</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-700 text-2xl focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <LuMenu />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      
        <div
          id="mobile-menu"
          className={`fixed top-16 right-0 h-full w-full sm:w-80 bg-white shadow-md md:hidden z-50 border-t sm:border-0 border-gray-400 transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex space-x-4 px-4 mt-3 ">
            <button className="flex-1 bg-transparent py-2 text-customRichBrown font-medium text-xs font-opensans border-customRichBrown border rounded-full">
              Join My Thrift
            </button>
            <button className="flex-1  bg-customOrange py-2 text-white text-xs font-opensans rounded-full">
              Sign In
            </button>
          </div>

          <div className="flex flex-col  items-start mt-8 px-4 space-y-4">
            <a
              href={`${REACT_APP_DOMAIN}/`}
              className="text-base font-roboto border-gray-200 font-medium w-full py-3 border-b text-gray-900"
              onClick={closeMobileMenu}
            >
              Explore our Marketplace
            </a>
            <a
              href={`${REACT_APP_DOMAIN}/trips`}
              className="text-base font-roboto font-medium border-gray-200 w-full py-3 border-b text-gray-900"
              onClick={closeMobileMenu}
            >
              Sign up as a vendor!
            </a>
            <a
              href={`${REACT_APP_DOMAIN}/past-trips`}
              className="text-base font-roboto font-medium border-gray-200 w-full py-3 border-b text-gray-900"
              onClick={closeMobileMenu}
            >
              Drop Feedback
            </a>
          </div>
        </div>
      
    </nav>
  );
}
