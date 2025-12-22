"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { useState } from "react";

function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/explore-stories", label: "Explore" },
    { href: "/dashboard/add-new-story", label: "Create" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="bg-[#FFA500] sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-5 md:px-8 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 z-50">
          <Image
            src="/images/stories.ico"
            width={45}
            height={45}
            alt="logo"
            className="rounded-full bg-white p-1"
          />
          <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Kids Stories
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6 font-bold">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-all duration-300 ${
                pathname === link.href
                  ? "text-yellow-900 border-b-2 border-yellow-900"
                  : "text-white hover:text-yellow-100"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <SignedOut>
            <Link
              href="/sign-in"
              className="btn btn-sm md:btn-md bg-white text-[#FFA500] hover:bg-gray-100 border-none"
            >
              Get Started
            </Link>
          </SignedOut>
        </div>

        {/* Mobile Toggle Button */}
        <div className="lg:hidden flex items-center gap-4 z-50">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white text-3xl focus:outline-none"
          >
            {isOpen ? <IoClose /> : <HiMenuAlt3 />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`
          fixed inset-0 bg-[#FFA500] flex flex-col items-center justify-center gap-8 transition-all duration-300 lg:hidden
          ${isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
        `}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`text-2xl font-bold ${
                pathname === link.href
                  ? "text-yellow-900 underline"
                  : "text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <SignedOut>
            <Link
              href="/sign-in"
              onClick={() => setIsOpen(false)}
              className="btn btn-lg bg-white text-[#FFA500] border-none px-10"
            >
              Get Started
            </Link>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}

export default Header;
