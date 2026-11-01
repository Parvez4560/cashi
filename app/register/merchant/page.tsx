'use client';

import React from 'react';
import MerchantApplicationForm from './MerchantApplicationForm'; // আপনার কম্পোনেন্টের পাথ অনুযায়ী ঠিক করে নিবেন

export default function MerchantRegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      {/* পেজের হেডার বা টাইটেল সেকশন */}
      <div className="max-w-3xl mx-auto mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          মার্চেন্ট অ্যাকাউন্ট রেজিস্ট্রেশন
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          প্রহর (Prohor) প্ল্যাটফর্মে মার্চেন্ট হিসেবে যুক্ত হতে নিচের ফর্মটি সঠিকভাবে পূরণ করুন।
        </p>
      </div>

      {/* মূল মাল্টি-স্টেপ ফর্ম কম্পোনেন্ট */}
      <main>
        <MerchantApplicationForm />
      </main>
    </div>
  );
}