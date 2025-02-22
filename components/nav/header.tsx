"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Container } from "../layout/container";
import { cn } from "../../lib/utils";
import { tinaField } from "tinacms/dist/react";
import { Icon } from "../icon";
import NavItems from "./nav-items";
import { useLayout } from "../layout/layout-context";

const headerColor = {
  default:
    "text-black from-gray-50 to-white",
  primary: {
    blue: "text-white from-blue-300 to-blue-500",
    teal: "text-white from-teal-400 to-teal-500",
    green: "text-white from-green-400 to-green-500",
    red: "text-white from-red-400 to-red-500",
    pink: "text-white from-pink-400 to-pink-500",
    purple: "text-white from-purple-400 to-purple-500",
    orange: "text-white from-orange-400 to-orange-500",
    yellow: "text-white from-yellow-400 to-yellow-500",
  },
};

export default function Header() {
  const { globalSettings, theme } = useLayout();
  const header = globalSettings!.header;

  const headerColorCss =
    header!.color === "primary"
      ? headerColor.primary[theme!.color as keyof typeof headerColor.primary]
      : headerColor.default;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Effect to detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      // Check if the scroll position is greater than 200px
      if (window.scrollY > 800) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll); // Clean up
    };
  }, []);

  return (
    <div
      className={`bg-gradient-to-b ${headerColorCss} ${isSticky ? "fixed top-0 z-50 w-full bg-[#FFF8CB] shadow-lg" : ""
        } transition-all duration-500 ease-out`}
    >
      <Container size="custom" className="py-0 relative h-auto z-10 max-w-8xl">
        <div className={`flex items-center justify-between gap-6 ${isSticky ? "h-14" : ""}`}>
          <h4 className="select-none text-lg font-bold tracking-tight my-4 transition duration-150 ease-out transform">
            <Link
              href="/"
              className="flex gap-1 items-center whitespace-nowrap tracking-[.002em]"
            >
              <Icon
                tinaField={tinaField(header as any, 'icon')}
                parentColor={header!.color as keyof typeof headerColor.primary}
                data={{
                  name: header?.icon?.name,
                  color: header?.icon?.color,
                  style: header?.icon?.style,
                }}
              />{' '}
              {/* <span data-tina-field={tinaField(header as any, 'name')}>
                {header?.name}
              </span> */}
              <img alt="מנציחים את רועי" src={header?.logo?.url} data-tina-field={tinaField(header as any, 'logo')} />
            </Link>
          </h4>

          {/* Hamburger Icon for Mobile */}
          <button
            className="md:hidden flex items-center justify-center p-2 rounded focus:outline-none"
            onClick={toggleMobileMenu}
          >
            {/* Icon for Hamburger Menu */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>

          {/* Regular Navigation Menu (hidden on mobile) */}
          <div className="hidden md:flex">
            <NavItems navs={header!.nav} />
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden flex flex-col items-start gap-2 py-4">
            <NavItems navs={header!.nav} />
          </div>
        )}

        <div
          className={cn(
            `absolute h-1 bg-gradient-to-r from-transparent`,
            theme?.darkMode === 'primary'
              ? `via-white`
              : `via-black dark:via-white`,
            'to-transparent bottom-0 left-4 right-4 -z-1 opacity-5'
          )}
        />
      </Container>

    </div>
  );
}
