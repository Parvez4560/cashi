"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const solutionsData = [
  {
    title: "মার্চেন্ট",
    icon: "/icons/imaze/merchant.jpg",
    link: "/merchant",
  },
  {
    title: "অনলাইন ব্যবসা",
    icon: "/icons/imaze/online-merchant.jpg",
    link: "/online-merchant",
  },
  {
    title: "শিক্ষা প্রতিষ্ঠান",
    icon: "/icons/imaze/education.jpg",
    link: "/education",
  },
  {
    title: "কর্পোরেট এবং এন্টারপ্রাইজ",
    icon: "/icons/imaze/corporate.jpg",
    link: "/corporate",
  },
];

export default function BusinessSolutions() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // একটি একটি বা নিখুঁত মাপে স্লাইড করার ফাংশন
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.6; // কতটুকু দূরত্বে স্ক্রোল করবে
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden bg-gray-50">
      {/* সেকশনের শিরোনাম ও বিবরণ */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          ব্যবসার জন্য ক্যাশি
        </h2>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          ক্যাশি-এর আর্থিক সল্যুশনের মাধ্যমে আপনার ব্যবসায়িক লেনদেন করতে পারবেন আরো দ্রুত, সহজে ও নিরাপদে। তাই আরো দক্ষতার সাথে ব্যবসা পরিচালনা করুন ক্যাশি এর মাধ্যমে।
        </p>
      </div>

      {/* মূল স্লাইডার কন্টেইনার */}
      <div className="relative max-w-3xl mx-auto px-14 sm:px-16">
        
        {/* ১. বাম পাশের বাটন (<) */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-1 top-1/2 -translate-y-1/2 z-30 w-11 h-11 bg-white border-2 border-gray-200 text-gray-800 rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition"
          aria-label="Previous"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* ২. কার্ডগুলোর ভিউপোর্ট (যাতে কার্ডগুলো বাটনের নিচে না পড়ে বরং একটু ভেতর থেকে সরে থাকে) */}
        <div className="w-full overflow-hidden py-3 px-2">
          <div
            ref={scrollRef}
            className="flex gap-5 sm:gap-6 overflow-x-auto scroll-smooth py-2 px-2 no-scrollbar w-full"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {solutionsData.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className="flex-shrink-0 w-[220px] sm:w-[250px] min-h-[320px] bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-between text-center group"
              >
                {/* ইমেজের ব্যাকগ্রাউন্ড ট্রান্সপারেন্ট রেখে ক্লিন করা হয়েছে */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 relative my-auto flex items-center justify-center rounded-2xl p-2 group-hover:scale-105 transition-transform">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={90}
                    height={90}
                    className="object-contain w-full h-full"
                  />
                </div>

                {/* কার্ডের শিরোনাম */}
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 group-hover:text-[#16A085] transition-colors leading-snug mt-4">
                  {item.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>

        {/* ৩. ডান পাশের বাটন (>) */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-1 top-1/2 -translate-y-1/2 z-30 w-11 h-11 bg-white border-2 border-gray-200 text-gray-800 rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition"
          aria-label="Next"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
          </svg>
        </button>

      </div>
    </section>
  );
}