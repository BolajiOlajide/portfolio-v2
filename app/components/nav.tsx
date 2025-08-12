"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useState } from "react";
import { MoonIcon, SunIcon, HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";

import LogoDark from "assets/svgs/LogoDark";
import LogoLight from "assets/svgs/LogoLight";

const navItems = {
  "/blog": {
    name: "blog",
  },
  "/uses": {
    name: "uses",
  },
  "/music": {
    name: "music",
  },
  "/projects": {
    name: "projects",
  },
  "/recognitions": {
    name: "recognitions",
  },
};

export function Navbar() {
  const { setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <aside className="nav__wrapper">
      <nav className="nav">
        <Link href="/" className="logo">
          <LogoLight data-hide-on-theme="light" />
          <LogoDark data-hide-on-theme="dark" />
        </Link>
        
        {/* Desktop Navigation */}
        <ul className="links link-underline link-underline--accent">
          {Object.entries(navItems).map(([path, { name }]) => {
            return (
              <li key={path}>
                <Link href={path}>{name}</Link>
              </li>
            );
          })}
        </ul>

        {/* Theme Toggles */}
        <div className="nav__controls">
          <button
            onClick={() => setTheme("dark")}
            data-hide-on-theme="dark"
            className="theme-toggle"
          >
            <SunIcon />
          </button>
          <button
            onClick={() => setTheme("light")}
            className="theme-toggle"
            data-hide-on-theme="light"
          >
            <MoonIcon />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="mobile-menu-toggle"
            aria-label="Toggle mobile menu"
          >
            {isMenuOpen ? <Cross1Icon /> : <HamburgerMenuIcon />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <ul className="mobile-menu__links">
              {Object.entries(navItems).map(([path, { name }]) => {
                return (
                  <li key={path}>
                    <Link href={path} onClick={closeMenu}>
                      {name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </nav>
    </aside>
  );
}
