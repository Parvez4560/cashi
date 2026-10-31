'use client';

import Header from "@/components/TopBar"; // আপনার ফিক্সড টপবার কম্পোনেন্ট
import MerchantApplicationForm from ".//MerchantApplicationForm"; // আপনার ফর্ম কম্পোনেন্ট

export default function MerchantRegisterPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      
      {/* ফিক্সড টপবার */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white shadow-sm border-b border-gray-100">
        <Header />
      </header>

      {/* মূল কন্টেন্ট */}
      <main className="pt-24 pb-16 px-4 max-w-3xl mx-auto">
        
        {/* টপ ডেসক্রিপশন সেকশন */}
        <section className="mb-8 text-center sm:text-left space-y-4 px-2">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            মার্চেন্ট
          </h1>
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
            এখন মার্চেন্ট অ্যাকাউন্টের মাধ্যমে আপনার গ্রাহকদের থেকে সহজেই ডিজিটাল পেমেন্ট গ্রহণ করতে পারবেন। সেই সাথে রয়েছে মার্চেন্ট কিউআর, কাউন্টার পেমেন্ট, ২৪/৭ পেমেন্ট কালেকশন এবং লেনদেনের বিস্তারিত বিবরণী সুবিধা।
          </p>
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
            আপনি মার্চেন্ট অ্যাকাউন্ট খুলতে আগ্রহ প্রকাশ করেছেন বলে আপনাকে ধন্যবাদ। মার্চেন্ট হতে চাইলে অনুগ্রহ করে নিচের ফর্মটি পূরণ করুন। খুব শীঘ্রই আপনার সাথে যোগাযোগ করা হবে।
          </p>
        </section>

        {/* ফর্ম সেকশন */}
        <section>
          <MerchantApplicationForm />
        </section>

      </main>
    </div>
  );
}