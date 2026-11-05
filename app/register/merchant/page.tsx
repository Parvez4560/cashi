'use client';

import React from 'react';
import Header from "../../../components/TopBar";
import MerchantApplicationForm from './MerchantApplicationForm';

export default function MerchantRegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-955 overflow-x-hidden">
      
      {/* আগের পেজের ফিক্সড হেডার কম্পোনেন্ট */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white shadow-sm">
        <Header />
      </header>

      {/* মূল কন্টেন্ট (হেডার ফিক্সড থাকার কারণে ওপর থেকে মার্জিন বা প্যাডিং দেওয়া হয়েছে) */}
      <main className="pt-20 sm:pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        {/* পেজের হেডার বা টাইটেল সেকশন */}
        <div className="max-w-3xl mx-auto mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            মার্চেন্ট অ্যাকাউন্ট রেজিস্ট্রেশন
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            ক্যাশি প্ল্যাটফর্মে মার্চেন্ট হিসেবে যুক্ত হতে নিচের ফর্মটি সঠিকভাবে পূরণ করুন।
          </p>
        </div>

        {/* মূল মাল্টি-স্টেপ ফর্ম কম্পোনেন্ট */}
        <div className="max-w-3xl mx-auto">
          <MerchantApplicationForm />
        </div>
      </main>
    </div>
  );
}