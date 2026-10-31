"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const solutionsData = [
  {
    title: "মার্চেন্ট",
    icon: "/icons/imaze/merchant.png",
    link: "/merchant",
  },
  {
    title: "অনলাইন ব্যবসা",
    icon: "/icons/imaze/online-merchant.png",
    link: "/online-merchant",
  },
  {
    title: "শিক্ষা প্রতিষ্ঠান",
    icon: "/icons/imaze/education.png",
    link: "/education",
  },
  {
    title: "কর্পোরেট এবং এন্টারপ্রাইজ",
    icon: "/icons/imaze/corporate.png",
    link: "/corporate",
  },
];

export default function BusinessSolutions() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full py-8 px-2 max-w-7xl mx-auto bg-gray-50">
      {/* সেকশনের শিরোনাম ও বিবরণ */}
      <div className="text-center max-w-3xl mx-auto mb-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          ব্যবসার জন্য ক্যাশি
        </h2>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          ক্যাশি-এর আর্থিক সল্যুশনের মাধ্যমে আপনার ব্যবসায়িক লেনদেন করতে পারবেন আরো দ্রুত, সহজে ও নিরাপদে। তাই আরো দক্ষতার সাথে ব্যবসা পরিচালনা করুন ক্যাশি এর মাধ্যমে।
        </p>
      </div>

      {/* মূল স্লাইডার কন্টেইনার - দুই পাশের অতিরিক্ত গ্যাপ একদম রিমুভ করা হয়েছে */}
      <div className="relative max-w-4xl mx-auto px-6 sm:px-8">
        
        {/* বাম পাশের বাটন (<) */}
        <button
          onClick={() => scroll("left")}
          className="absolute -left-2 sm:left-0 top-1/2 -translate-y-1/2 z-40 w-10 h-10 bg-white border-2 border-gray-200 text-gray-800 rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition"
          aria-label="Previous"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* কার্ডগুলোর ভিউপোর্ট */}
        <div className="w-full overflow-x-auto no-scrollbar py-2 px-1" ref={scrollRef} style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <div className="flex gap-4 sm:gap-6 w-max">
            {solutionsData.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className="flex-shrink-0 w-[220px] sm:w-[250px] min-h-[320px] bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-between text-center group"
              >
                {/* কার্ডের ভেতরের ইমেজ বড় এবং ক্লিয়ার রাখা হয়েছে */}
                <div className="w-32 h-32 sm:w-36 sm:h-36 relative my-auto flex items-center justify-center rounded-2xl p-1 group-hover:scale-105 transition-transform">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={200}
                    height={200}
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

        {/* ডান পাশের বাটন (>) */}
        <button
          onClick={() => scroll("right")}
          className="absolute -right-2 sm:right-0 top-1/2 -translate-y-1/2 z-40 w-10 h-10 bg-white border-2 border-gray-200 text-gray-800 rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition"
          aria-label="Next"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
          </svg>
        </button>

      </div>
    </section>
  );
}