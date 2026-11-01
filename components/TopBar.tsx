"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Menu from "./Menu";

export default function TopBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* পুরো হেডার/টপবারের ব্যাকগ্রাউন্ড PrimaryColor */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-PrimaryColor backdrop-blur-md shadow-sm">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* Logo & Name */}
          <Link href="/" className="flex items-center gap-3">
            <div className="h-10 w-10 relative">
              <Image
                src="/icons/cashi.svg"
                alt="CashI"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>

            {/* লোগোর পাশের লেখা সাদা */}
            <span className="text-xl font-bold tracking-wide text-white">
              𝐂𝐀𝐒𝐇𝚰
            </span>
          </Link>

          {/* Action & Menu */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* ডাউনলোড বাটন: সরাসরি ডাউনলোড শুরু হওয়ার জন্য */}
            <a
              href="https://docs.google.com/uc?export=download&id=1nizxbnwekqawmT-_Q-VSqX_y90GlFPnY"
              download="CashI.apk"
              className="rounded-xl bg-white px-4 py-2 text-sm font-bold text-PrimaryColor shadow-sm hover:bg-gray-100 transition-colors flex items-center justify-center"
            >
              𝐂𝐚𝐬𝐡𝐈 App
            </a>

            {/* Menu Button */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
              className="flex h-10 w-10 items-center justify-center rounded-lg text-white hover:bg-white/10 transition-colors"
            >
              <Image
                src="/icons/ui/menu.svg"
                alt="Menu Icon"
                width={20}
                height={20}
                className="h-5 w-5 object-contain brightness-0 invert"
              />
            </button>
          </div>

        </div>
      </header>

      {/* মোবাইল/সাইড মেনু কম্পোনেন্ট */}
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}