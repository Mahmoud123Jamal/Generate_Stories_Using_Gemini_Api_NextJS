"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Header() {
  const pathname = usePathname();
  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/create-story", label: "Create Story" },
    { href: "/explore-story", label: "Explore Stories" },
  ];
  return (
    <nav className="bg-[#FFA500]">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/stories.ico"
            width={50}
            height={50}
            alt="logo"
            className="rounded-full"
          />
          <h1 className="text-2xl font-bold text-white">Kids Stories</h1>
        </Link>

        <div className="flex items-center gap-4 font-bold text-md">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`link ${
                pathname === link.href
                  ? "link-primary font-bold"
                  : "link-hover text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <SignedIn>
            <UserButton />
          </SignedIn>

          <SignedOut>
            <Link href="/sign-in" className="btn btn-primary btn-md">
              Get Started
            </Link>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}

export default Header;
